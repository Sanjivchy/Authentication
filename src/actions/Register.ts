"use server"
import * as z from "zod"
import { RegisterSchemas } from "@/schemas";
import bcrypt from 'bcrypt';
import { db } from '@/lib/db'

export const register =async (values:z.infer<typeof RegisterSchemas>) =>{
    const validatedFields = RegisterSchemas.safeParse(values);
    if(!validatedFields.success){
        return {error : 'Invalid fields!', success : false}
    }
    const {email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await  db.user.findUnique({
        where:{
            email
        }
    });

    if(existingUser){
        return {error : 'Email already exists!', success : false}
    }

    await db.user.create({
        data:{
            email,
            name,
            password: hashedPassword
        }
    })

    return{ success : 'User created ;',}
}