// define a register and sign in schema


import z from "zod"

export const RegisterSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string(),
})

export const SignInSchema = z.object({
    email: z.string().email(),
    password:z.string()
})