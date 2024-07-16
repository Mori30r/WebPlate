import React from "react";
import SignupForm from "@/app/_components/SignupForm";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Register in WebPlate Restaurant Web Application",
};

function Page() {
    return <SignupForm />;
}

export default Page;
