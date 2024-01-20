
"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
interface loginButtonProps{
  children: React.ReactNode,
  mode?: "modal" | "redirect",
  asChild?:Boolean
}
export const LoginButton:React.FC<loginButtonProps> = ({
  children,
  mode = "redirect",
  asChild
}) => {
  const router = useRouter();
  const onClick =( ) =>{
    router.push("/auth/login")
  }
  
  if(mode === "modal"){
    return (
      <button onClick={onClick} className='cursor-pointer'>{children}</button>
    )
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>{children}</span>
  )
}
