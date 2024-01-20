"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import Header from '../auth/Header'
import Social from './Social'
import BackButton from './BackButton'
interface CardWrapperProps {
    children : React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean
}

export const CardWrapper:React.FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton 
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}