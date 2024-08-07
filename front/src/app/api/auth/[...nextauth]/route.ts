import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler: NextApiHandler = (req, res) => NextAuth(authOptions)(req, res);

export { handler as GET, handler as POST };
