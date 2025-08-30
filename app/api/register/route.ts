// define the route.ts ?? 
import { RegisterSchema } from "@/lib/schema";
import { NextRequest} from "next/server";
import bcrypt from "bcrypt"
import { db } from "@/lib/db";

export async function POST(req:NextRequest)
{
    // POST /api/register
    const body  = await req.json();
    const {name,email, password} = body;
    const { success,error } = RegisterSchema.safeParse(body);

    if(!success)
    {
        return  new Response(JSON.stringify({name,password}),{
            status: 403,
        })

    }

    // hash the password
    const hashpswd = await bcrypt.hash(password,10); //SALT-rounds = 10
    // store it in the DB, but before that check if the user already exists,

    // find the user through email
    const user = await db.user.findUnique({
        where: {
            email:email
        }
    })

    if(user)
    {
        return new Response(JSON.stringify({
            "message":"User already exists, Register with new credentials",
            "exists":true
        }))
    }
    await db.user.create({
        data:{
            name:name,
            email:email,
            password:hashpswd
        }
    })

    return new Response(JSON.stringify({
        "username":name,
        "password":password,
        "message":"Succesfully created! "
    }),{
        status:200
    })

}