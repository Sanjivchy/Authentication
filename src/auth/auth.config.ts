
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchemas } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from 'bcryptjs';
import github from "next-auth/providers/github";
import google
 from "next-auth/providers/google";
export default {
  providers: [
    github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
        //@ts-ignore
        async authorize(credentials){
            const validateFields = LoginSchemas.safeParse(credentials);

            if(validateFields.success){
                const { email, password } = validateFields.data;
                const user = await getUserByEmail(email);
                if(!user || !user.password){
                    return null
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if(passwordMatch){
                    return user
                }
                return user
            }
        }
    })
  ],
} satisfies NextAuthConfig