// 

'use client'
import { Button } from "../ui/button"
import { Card, CardHeader ,CardTitle,CardDescription, CardContent, CardFooter} from "../ui/card"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export const LoginForm = () =>{ 
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e:any) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e:React.SyntheticEvent) => {
        // send the details to the api
        e?.preventDefault();
        // ✅ Call NextAuth's signIn instead of axios
        const res = await signIn("credentials", {
            redirect: false, // prevent auto redirect
            email: formData.email,
            password: formData.password,
        });
    
        if (res?.error) {
            toast.error("Invalid email or password!");
        } else {
            toast.success("Successfully signed in!");
            router.push("/dashboard"); // redirect wherever you want
        }

        console.log("Form submitted! ")
        console.log("The email and password is ", formData.email, "\n Password ",formData.password );
    }

    const GoogleLoginhandle = async  () => {
        try {
            console.log("Google button clicked ! ")
            const res = await signIn("google", {
              redirect: false, // prevent auto redirect
              callbackUrl: "/dashboard", // where to go after login
            });
        
            if (res?.error) {
              toast.error("Google login failed!");
              console.error("Google login error:", res.error);
            } else {
              toast.success("Signed in with Google!");
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Unexpected Google login error:", error);
            toast.error("Something went wrong. Try again!");
          }
    }
    const handlegitlogin =async () => {
        try {
            const res = await signIn("github", {
              redirect: false, // prevent auto redirect
              callbackUrl: "/dashboard", // where to go after login
            });
        
            if (res?.error) {
              toast.error("GitHub login failed!");
              console.error("GitHub login error:", res.error);
            } else {
              toast.success("Signed in with GitHub!");
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Unexpected GitHub login error:", error);
            toast.error("Something went wrong. Try again!");
          }
    }
    return (
        <>
        <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-[40px] ">🔐 Auth</h1>
                <p className="text-[18px]">Login to ur account</p>
            </CardHeader>
            <CardContent className="">
            <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="mr#erjbsv"
                className="border-purple-200 border-2 solid p-1"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="gap-2">
              <div className="flex items-center">
                <label htmlFor="password">Password</label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <input id="password" type="password" required
              placeholder="*******"
              className="w-full border-purple-200 border-2 solid p-1"
              value={formData.password}
              onChange={handleChange}/>
            </div>
            <Button className="w-full" type="submit">
                Submit
            </Button>
          </div>
        </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                {/*add socials here like google and github */}
                <div className="flex justify-between w-full">
                    <Button variant="outline" className="w-[75px] h-[40px]"
                    onClick={GoogleLoginhandle}
                    ><FcGoogle 
                    className="h-10 w-10" 
                    /></Button>
                    <Button variant="outline" className="w-[75px] h-[40px] 
                    "
                    onClick={handlegitlogin}
                    ><FaGithub
                    className="h-10 w-10" /></Button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button>
                        <Link href="/register">
                        Don't have an account
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
        </>
    )
}