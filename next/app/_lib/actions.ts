"use server";

import { UserLogin, UserSignup } from "@/types/global";
import { auth, signIn } from "./auth";
import { revalidatePath } from "next/cache";

const baseURL = process.env.BASE_LOCAL_URL;
const apiURL = process.env.API_URL;

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

export async function createAddress(userInput: FormData) {
    const session: any = await auth();
    const body = {
        name: userInput.get("name"),
        detail: userInput.get("detail"),
        latitude: userInput.get("latitude"),
        longitude: userInput.get("longitude"),
    };

    await fetch(`${apiURL}/users/address/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(body),
    });
    revalidatePath("/dashboard/order");
}
