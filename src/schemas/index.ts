import * as z from "zod"

export const LoginSchemas = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    password: z.string().min(1,{
        message:"Password is required"
    }),
})

export const RegisterSchemas = z.object({
    name: z.string().min(1,{
        message:"Name is required"
    }),
    email: z.string().email({
        message:"Email is required"
    }),
    password: z.string().min(6,{
        message:"Password is required"
    }),
})

export const ResetSchemas = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
})

export const NewPasswordSchemas = z.object({
    password: z.string().min(6,{
        message:"Password is required"
    }),
})