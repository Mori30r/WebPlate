"use server";

import { UserLogin, UserSignup } from "@/types/global";
import { signIn } from "./auth";
import { AuthError } from "next-auth";

const baseURL = process.env.BASE_LOCAL_URL;

export async function signInAction(userInput: UserLogin) {
    try {
        await signIn("credentials", {
            ...userInput,
            redirect: false,
        });
    } catch (error: any) {
        switch (error.type) {
            case "CallbackRouteError":
                return { error: "Invalid Email or Password" };
            default:
                return { error: "Something went wrong" };
        }
    }
}

export async function registerAction(userInput: UserSignup) {
    const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    } else {
        await signInAction({
            email: userInput.email,
            password: userInput.password,
        });
    }
}
