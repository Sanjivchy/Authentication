import React from 'react'

interface headerProps{
    label: string
}
const Header:React.FC<headerProps> = ({label}) => {
  return (
    <div className='flex w-full flex-col gap-y-4 items-center justify-center'>
        <h1 className='text-3xl'>Auth</h1>
        <p>{label}</p>
    </div>
  )
}

export default Header