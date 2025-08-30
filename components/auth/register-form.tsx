// 

'use client'
import { Button } from "../ui/button"
import { Card, CardHeader ,CardContent, CardFooter} from "../ui/card"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export const RegisterForm = () =>{ 
    const [formData, setFormData] = useState({
        name: '',
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
        try {
            const response = await axios.post("http://localhost:3000/api/register",formData,
                {
                    headers: {
                        "Content-Type":"Application/json"
                    }
                }
            );
            console.log("REsponse Data is ", response.data);
            if(response.data.exists)
            {
                toast.error("The user already exists, Enter new credentials! ")
            }
            else {
                toast.success("Successfully registered! ")
            }
        }
        catch(error)
        {
            toast.error("Error signing in currently !");
            console.error('Registration  failed:', error);
        }

        console.log("Form submitted! ")
        console.log("The email and password is ", formData.name, "\n Password ",formData.password, 
            "Email is ", formData.email
         );
    }
    return (
        <>
        <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-[40px] ">🔐 Auth</h1>
                <p className="text-[18px]">Create ur account</p>
            </CardHeader>
            <CardContent className="">
            <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="johndoe"
                className="border-purple-200 border-3 solid p-1"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@yahoo.com"
                className="border-purple-200 border-3 solid p-1"
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
              className="w-full border-purple-200 border-3 solid p-1"
              value={formData.password}
              onChange={handleChange}/>
            </div>
            <Button className="w-full" type="submit">
                Register
            </Button>
          </div>
        </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                {/*add socials here like google and github */}
                <div className="flex justify-between w-full">
                    <Button variant="outline" className="w-[75px] h-[40px]"><FcGoogle 
                    className="h-10 w-10" /></Button>
                    <Button variant="outline" className="w-[75px] h-[40px]"><FaGithub
                    className="h-10 w-10" /></Button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button>
                        <Link href="/auth/login">
                        Already have an account Sign IN
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
        </>
    )
}