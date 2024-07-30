import { User, UserLoginResponse } from "@/types/global";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const apiURL = process.env.API_URL;

const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            async authorize(credentials) {
                let user: User | null = null;

                const response = await fetch(`${apiURL}/users/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!response.ok) {
                    throw new Error("There is an Error in Server");
                }

                const data: UserLoginResponse = await response.json();

                if (!data.access) {
                    throw new Error("Invalid email or password");
                }

                if (response.ok && data.access) user = data.user;

                return user;
                // return {
                //     ...user,
                //     accessToken: data.access,
                //     refreshToken: data.refresh,
                // };
            },
        }),
    ],
    pages: {
        signIn: `/login`,
    },
    callbacks: {
        // async jwt({ token, user }: any) {
        //     if (user) {
        //         token.accessToken = user.accessToken;
        //         token.refreshToken = user.refreshToken;
        //     }
        //     return token;
        // },
        // async session({ session, token }: any) {
        //     session.accessToken = token.accessToken;
        //     session.refreshToken = token.refreshToken;
        //     return session;
        // },
        authorized({ auth }: any) {
            return !!auth?.user;
        },
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 5 * 24 * 24 * 24, // 5 days
    },
};

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth(authConfig);
