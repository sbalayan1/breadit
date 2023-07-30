import NextAuth from "next-auth/next"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions) 

export { handler as GET, handler as POST} // any calls to the api/auth/[...nextauth] with a GET or POST will be handled by our handler