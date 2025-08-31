// here this file will be imported to [...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


// this is for sign in only for sign up we have custom routes to implement the registration
/*
Get a credential provideer and get the credentials via email or password, 

*/
export const authOptions: NextAuthConfig = {
    pages: {
        signIn: '/login'
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any,req) {
            // 
            // This is a mock user for demonstration purposes
            const mockUser = {
                id: "1",
                name: "Zia",
                email: "zia32@gmail.com",
                password: "zia#@12"
            };

            // This is the core validation logic.
            // Check if the credentials from the form match the user you found.
            // Await `bcrypt.compare` in a real app.
            if (
                credentials?.email === mockUser.email &&
                credentials?.password === mockUser.password
            ) {
                // IMPORTANT: Only return the public user data here.
                // This is what will be stored in the session.
                return {
                    id: mockUser.id,
                    name: mockUser.name,
                    email: mockUser.email,
                };
            }
            
            // If validation fails for any reason, return null.
            return null;
            }
        })]
    }