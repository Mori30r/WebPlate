"use client";

import React from "react";
import { usePathname } from "next/navigation";
import PrimaryButton from "./PrimaryButton";

function AuthSwitch() {
    const path = usePathname().split("/").at(-1);

    return (
        <div className="flex gap-5 bg-zinc-800 p-4 mx-auto rounded-xl">
            <PrimaryButton
                size="big"
                href="/signup"
                disabled={path !== "signup"}
            >
                Sign Up
            </PrimaryButton>
            <PrimaryButton size="big" href="/login" disabled={path !== "login"}>
                Sign In
            </PrimaryButton>
        </div>
    );
}

export default AuthSwitch;
