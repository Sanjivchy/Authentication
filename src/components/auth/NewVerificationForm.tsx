"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from './CardWrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/NewVerification';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token');
      return;
    };
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      }).catch((error) => {
        setError('Something went wrong')
        setSuccess('')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <CardWrapper
      headerLabel='Confirming your email'
      backButtonLabel="back to login"
      backButtonHref='/auth/login'
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  )
}

export default NewVerificationForm