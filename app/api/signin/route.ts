import { SignInSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    // POST /api/signin
    const body = await req.json();
    const { email, password } = body;

    // Validate the request body
    const { success, error } = SignInSchema.safeParse(body);
    if (!success) {
        return new NextResponse(JSON.stringify({ message: "Invalid email or password format." }), {
            status: 400, // Bad Request
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        // Find the user by email
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        });

        // 1. First, check if the user exists. If not, return an Unauthorized error immediately.
        // This prevents the TypeError.
        if (!user) {
            return new NextResponse(JSON.stringify({
                message: "Invalid email or password."
            }), {
                status: 401, // Unauthorized
                headers: { "Content-Type": "application/json" }
            });
        }
        
        // 2. Only if the user exists, we check the password.
        if (!(await bcrypt.compare(password, user.password as string))) {
            return new NextResponse(JSON.stringify({
                message: "Invalid email or password."
            }), {
                status: 401, // Unauthorized
                headers: { "Content-Type": "application/json" }
            });
        }

        // On successful sign-in, return a success message.
        return new NextResponse(JSON.stringify({
            message: "Successfully signed in!",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        // 3. The try...catch block handles any other unexpected errors,
        // such as a database connection failure, and returns a proper 500 error.
        console.error('Sign-in API error:', error);
        return new NextResponse(JSON.stringify({
            message: "An unexpected error occurred during sign-in."
        }), {
            status: 500, // Internal Server Error
            headers: { "Content-Type": "application/json" }
        });
    }
}