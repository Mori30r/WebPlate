"use server";

import { auth } from "./auth";

const baseURL = process.env.API_URL;

export async function getAddresses() {
    const session: any = await auth();
    const accessToken = session?.user.accessToken;
    const response = await fetch(`${baseURL}/users/address/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function getMeals() {
    const session: any = await auth();
    const accessToken = session?.user.accessToken;

    const response = await fetch(`${baseURL}/meals/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function getMeal(mealId: number) {
    const session: any = await auth();
    const accessToken = session?.user.accessToken;

    const response = await fetch(`${baseURL}/meals/${mealId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function getCategories() {
    const session: any = await auth();
    const accessToken = session?.user.accessToken;

    const response = await fetch(`${baseURL}/categories/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}
