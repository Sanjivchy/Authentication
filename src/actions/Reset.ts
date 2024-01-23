"use server"
import * as z from "zod"
import { ResetSchemas } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values:z.infer<typeof ResetSchemas>) =>{
    const validatedFields = ResetSchemas.safeParse(values);

    if(!validatedFields.success){
        return {error : 'Invalid Email!'}
    }

    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return {error : 'Email does not exists!'}
    }
    // TODO GENERATE TOKEN and send email
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken .email,
        passwordResetToken.token
    )

    return{ success : 'Check your email',}
}