"use client"
import * as z from 'zod';
import React, { useTransition } from 'react'
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchemas } from '@/schemas/index';
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
import { newPassword } from '@/actions/NewPassword'
const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState<string | undefined>('')
    const [success, setSuccess] = React.useState<string | undefined>('')

    const form = useForm<z.infer<typeof NewPasswordSchemas>>({
        resolver: zodResolver(NewPasswordSchemas),
        defaultValues: {
            password: "",
        },
    });
    const handleSubmit = (values: z.infer<typeof NewPasswordSchemas>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            newPassword(values, token as string)
                .then((res) => {
                    setError(res?.error)
                    setSuccess(res?.success);
                })

        })
    }
    return (
        <CardWrapper
            headerLabel='Reset password'
            backButtonLabel="Back to login"
            backButtonHref='/auth/login'
        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='space-y-4'>
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
                                                autoComplete="password"
                                                placeholder="Enter your password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type='submit' className='w-full'>Reset password</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm