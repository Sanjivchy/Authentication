import React from 'react'
import { CheckCircledIcon } from '@radix-ui/react-icons';
interface FormSuccessProps {
    message?:string;
}
const FormSuccess:React.FC<FormSuccessProps> = ({message}) => {
    if(!message) return null
  return (
    <div className='bg-emerald-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-700'>
        <CheckCircledIcon className='h-4 w-5' />
        <p>{message}</p>
    </div>
  )
}

export default FormSuccess