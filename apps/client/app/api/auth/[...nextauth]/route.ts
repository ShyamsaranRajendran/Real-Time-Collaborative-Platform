import NextAuth from "next-auth";
// Make sure the path below points to the actual location of your auth.ts file
import { authOptions } from "../../../../lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };