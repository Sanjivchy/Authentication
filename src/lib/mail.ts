import email from 'next-auth/providers/email';
import { Resend } from 'resend';

const resend  = new Resend(process.env.RESEND_API_KEY);


export  const sendPasswordResetEmail = async(
    email:string,
    token:string
) =>{
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`
    const message = `<p>Please reset your password by clicking on the link below:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    await resend.emails.send({
        to: email,
        from: "onboarding@resend.dev",
        subject: "Please reset your password",
        html: message
    });
}


export const sendVerificationEmail = async(
    email: string,
    token: string
) =>{
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    const message = `<p>Please confirm your email by clicking on the link below:</p><p><a href="${confirmLink}">${confirmLink}</a></p>`
    await resend.emails.send({
        to: email,
        from: "onboarding@resend.dev",
        subject: "Please confirm your email",
        html: message
    });
}