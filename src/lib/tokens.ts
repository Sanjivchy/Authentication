import crypt from "crypto";
import  { v4 as uuidV4 } from "uuid";

import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/PasswordResetToken";
import { getVerificationTokenByEmail } from "@/data/VerificationToken";
import { getTwoFactorTokenByEmail } from "@/data/TwoFactorToken";

export const generateTwoFactorToken = async(email:string) =>{
    const token = crypt.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    //TODO later change expire time to 5 minutes
    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }
    
    const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return twoFactorToken
}
export const generatePasswordResetToken = async(email:string) =>{
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    
    if(existingToken) {
        await db.passwordResetToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return passwordResetToken
}

/**
 * Generate a verification token for the given email.
 *
 * @param {string} email - The email to generate the token for
 * @return {Promise<VerificationToken>} The generated verification token
 */
export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return verificationToken
}

