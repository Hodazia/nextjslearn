'use client'

import { useSession }  from "next-auth/react"
export default function dashboard() {
    const { data: session, status } = useSession()

    return (
        <>
        <p>The dashboard page</p>
        </>
    )
}