import { User, UserLoginResponse } from "@/types/global";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const apiURL = process.env.API_URL;

const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            async authorize(credentials) {
                let user: User | null = null;
                try {
                    const response = await fetch(`${apiURL}/users/login/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const data: UserLoginResponse = await response.json();

                    if (data.user) {
                        user = data.user;
                        user.accessToken = data.access;
                    } else {
                        throw new Error("Email or Password is Invalid");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: `/login`,
    },
    callbacks: {
        authorized({ auth }: any) {
            return !!auth?.user;
        },
        jwt({ token, user }: any) {
            if (user) {
                token.profile = user.profile;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        session({ session, token }: any) {
            session.user.profile = token.profile;
            session.user.accessToken = token.accessToken;
            return session;
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
