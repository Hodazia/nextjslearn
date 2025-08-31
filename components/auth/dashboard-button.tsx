// define a login button 
'use client'
import React from "react"
import { useRouter } from "next/navigation"

interface DashboardButtonProps {
    children: React.ReactNode,
    mode?:string,
    asChild?: boolean
}

export const DashboardButton = ({children
    , mode='redirect',asChild
}:DashboardButtonProps) =>{
    // children prop to be sent
    const route = useRouter();
    const handleClick = () => {
        route.push('/dashboard');
    }
    return (
        <>
        <span onClick={handleClick} className="cursor-pointer">
            {children}
        </span>
        </>
    )
}