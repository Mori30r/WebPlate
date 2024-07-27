import { User, UserLoginResponse } from "@/types/global";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const baseURL = process.env.API_URL;

const authConfig = {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user: User;
                const res = await fetch(`${baseURL}/users/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!res.ok) {
                    throw new Error("Invalid email or password");
                }

                const data: UserLoginResponse = await res.json();

                if (!data.access) return null;
                user = data.user;
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
