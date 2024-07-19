import React from "react";
import type { Metadata } from "next";
import LoginForm from "@/app/_components/LoginForm";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Login into WebPlate Restaurant Web Application",
};

function Page() {
    return <LoginForm />;
}

export default Page;
