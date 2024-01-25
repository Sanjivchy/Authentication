import NextAuth ,{ type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "../lib/db"
import { getUserById } from "@/data/user"
import { getTwoFactoConfirmationByUserID } from "@/data/TwoFactorConfirmation";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: "ADMIN" | "USER"
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events:{
    async linkAccount({ user, }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data:{
          emailVerified: new Date()
        }
      })  
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      //allow OAuth without email verification
      if(account?.provider !== 'credentials') {
        return true
      }
      
      if(user.id){
        const existingUser = await getUserById(user.id)
        //prevent  sign in without email verification
        if(!existingUser) {
          return false
        }

        if(existingUser.isTwoFactorEnabled){
          const twoFactorConfirmation = await getTwoFactoConfirmationByUserID(existingUser.id)
          if(!twoFactorConfirmation){
            return false
          }
          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id
            }
          })
        }
      }
  
      return true
    },
    //@ts-ignore
    async session({session, token }) {

      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role
      }
      return session
    },
    
    async jwt({ token }) {
      if(!token.sub){
        return token
      }
      const existingUser = await getUserById(token.sub)
      if(!existingUser) {
        return token
      }

      token.role = existingUser.role
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})