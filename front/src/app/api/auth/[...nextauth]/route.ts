import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import { IRegisterValues } from "@/interfaces";

declare module "next-auth" {
  interface IUser extends IRegisterValues {
    id: number;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent", // puedes ajustarlo según tus necesidades
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile?: Profile;
    }) {
      if (!profile) {
        console.error("Profile is undefined");
        return false;
      }
      try {
        const registerUrl = user.email.includes("admin")
          ? `${process.env.NESTJS_API_URL}/auth/adminSignUp`
          : `${process.env.NESTJS_API_URL}/auth/cxSignUp`;

        const response = await fetch(registerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            country: user.country,
            city: user.city,
            address: user.address,
            birthDate: user.birthDate,
          }),
        });

        if (response.ok) {
          return true;
        } else {
          console.error("Failed to register user:", response.statusText);
          return false;
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
