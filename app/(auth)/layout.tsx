import React from "react"
import { Toaster } from "sonner"

export default function AuthLayout({children}: {children:React.ReactNode}) {
    return (
        <>
        <div>
        <Toaster position="top-right" />
        <div className="bg-sky-500 flex h-screen w-screen flex-col 
        items-center justify-center">
            {children}
        </div>
        </div>
        </>
    )
}
