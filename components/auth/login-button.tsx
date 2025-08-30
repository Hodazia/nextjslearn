// define a login button 
'use client'
import React from "react"
import { useRouter } from "next/navigation"
interface LoginButtonProps {
    children: React.ReactNode,
    mode?:string,
    asChild?: boolean
}

export const LoginButton = ({children
    , mode='redirect',asChild
}:LoginButtonProps) =>{
    // children prop to be sent
    const route = useRouter();
    const handleClick = () => {
        route.push('/auth/login');
    }
    return (
        <>
        <span onClick={handleClick} className="cursor-pointer">
            {children}
        </span>
        </>
    )
}