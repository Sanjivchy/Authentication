"use server"
import * as z from "zod"
import { LoginSchemas } from "@/schemas"
export const register =async (values:z.infer<typeof LoginSchemas>) =>{
    const validatedFields = LoginSchemas.safeParse(values)
    if(!validatedFields.success){
        return {error : 'Invalid fields!', success : false}
    }
    return{ success : 'email sent',}
}