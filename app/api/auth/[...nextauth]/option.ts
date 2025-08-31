// import { NextAuthOptions } from "next-auth"
// import  CredentialsProvider  from "next-auth/providers/credentials"

// export const authoptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: { label: "Password", type: "password" }
//               },
//               async authorize(credentials) {
//                 // You need to provide your own logic here that takes the credentials
//                 // submitted and returns either a object representing a user or value
//                 // that is false/null if the credentials are invalid.
//                 // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//                 // You can also use the `req` object to obtain additional parameters
//                 const user = { id:1, email:"zia@example.com", "pswd":"slnivlsnvs;"}
          
//                 // If no error and we have user data, return it
//                 if (user) {
//                   return user
//                 }
//                 // Return null if user data could not be retrieved
//                 return null
//               }
//         })]
// }