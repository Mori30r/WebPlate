import { User, UserLoginResponse } from "@/types/global";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const apiURL = process.env.API_URL;

const authConfig = {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const response = await fetch(`${apiURL}/users/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Invalid email or password");
                }

                const data: UserLoginResponse = await response.json();

                if (!data.access) return null;
                const user: User = data.user;
                return {
                    ...user,
                    accessToken: data.access,
                    refreshToken: data.refresh,
                };
            },
        }),
    ],
    pages: {
        signIn: `/login`,
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
        authorized({ auth }: any) {
            return !!auth?.user;
        },
    },
};

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth(authConfig);
