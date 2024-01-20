"use client"
import * as z from 'zod';
import React,{ useTransition } from 'react'
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchemas } from '@/schemas/index';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { login } from '@/actions/Login'
const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState<string | undefined>('')
    const [success, setSuccess ] = React.useState<string | undefined>('')

    const form = useForm<z.infer<typeof LoginSchemas>>({
        resolver: zodResolver(LoginSchemas),
        defaultValues: {
            email:"",
            password:""
        },
    });
    const handleSubmit = (values:z.infer<typeof LoginSchemas>) =>{
        setError('');
        setSuccess('');
        startTransition(() => {
            login(values)
            .then((res) => {
                if (typeof res.success === 'string') {
                    setSuccess(res.success);
                }               
                 setError(res.error)
            })
        
        })
    }
  return (
    <CardWrapper
        headerLabel='Welcome back!'
        backButtonLabel="Don't have a account?"
        backButtonHref='/auth/register'
        showSocial
    >
        <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='space-y-4'>
                    <FormField
                        control={form.control} 
                        name='email'
                        render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isPending}
                                        {...field} 
                                        type="email" 
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />
                    <FormField
                        control={form.control} 
                        name='password'
                        render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isPending}
                                            {...field} 
                                            type="password" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button disabled={isPending} type='submit' className='w-full'>Login</Button>
            </form>   
        </Form>
    </CardWrapper>
  )
}

export default LoginForm