"use client"
import * as z from 'zod';
import React, { useTransition } from 'react'
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchemas } from '@/schemas/index';
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
import { reset } from '@/actions/Reset'
const ResetForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState<string | undefined>('')
    const [success, setSuccess] = React.useState<string | undefined>('')

    const form = useForm<z.infer<typeof ResetSchemas>>({
        resolver: zodResolver(ResetSchemas),
        defaultValues: {
            email: "",
        },
    });
    const handleSubmit = (values: z.infer<typeof ResetSchemas>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            reset(values)
                .then((res) => {
                    setError(res?.error)
                    setSuccess(res?.success);
                })

        })
    }
    return (
        <CardWrapper
            headerLabel='Forget your password?'
            backButtonLabel="Back to login"
            backButtonHref='/auth/login'
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type='submit' className='w-full'>Send Reset email</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetForm