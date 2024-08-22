import React from "react";
import SignupForm from "@/app/_components/SignupForm";

import { Metadata } from "next";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Register in WebPlate Restaurant Web Application",
};

async function Page() {
    const session = await auth();
    if (session?.user) redirect("/dashboard/home");

    return <SignupForm />;
}

export default Page;
