'use client'

import { Button } from "@/components/ui/button";
import { useSession }  from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function dashboard() {
    const { data: session, status } = useSession()
    console.log("Session is " , session);
    console.log("Status is ", status)
    const router = useRouter();
      // Redirect if not logged in
        // useEffect(() => {
        //     if (status === "loading") return; 
        //     if (status === "unauthenticated") {
        //         toast.error("You are not authenticated")
        //         router.push("/login");
        //     }
        // }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; // while redirecting, render nothing
      
    const handlelogout = async () => {

       
        // but the token is still there, so if u go to dashboard u won't be navigated to /signin
        // so what to do to remove the tokens,??
        // to do so 
        setTimeout( async () => {
            await signOut({
                redirect: false, // prevents auto redirect
              });
              toast.success("You are successfully logged out")
              router.push("/login");
        }, 1500)

        return null
    }
    return (
        <>
        <p>The dashboard page</p>
        <p>Welcome back {session.user?.name} ur email is {session.user?.email}</p>
        <Button size="lg"
        className="p-2 bg-red-400 text-gray-300 "
        onClick={handlelogout}>
            Logout
        </Button>
        </>
    )
}