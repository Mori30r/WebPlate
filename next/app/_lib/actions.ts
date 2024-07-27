"use server";

import { UserLogin, UserSignup } from "@/types/global";
import { signIn } from "./auth";

const baseURL = process.env.BASE_LOCAL_URL;

export async function signInAction(userInput: UserLogin) {
    await signIn("credentials", {
        redirectTo: "/dashboard/home",
        ...userInput,
    });
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
