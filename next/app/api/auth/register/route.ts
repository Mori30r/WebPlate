import { signInAction } from "@/app/_lib/actions";
import { NextResponse } from "next/server";

const apiURL = process.env.API_URL;

export async function POST(request: Request) {
    try {
        const { first_name, last_name, email, password } = await request.json();

        const response = await fetch(`${apiURL}/users/register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
            }),
        });
        const data = await response.json();
    } catch (e) {}

    return NextResponse.json({ message: "success" });
}
