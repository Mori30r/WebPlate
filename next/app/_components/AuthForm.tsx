"use client";

import React from "react";
import PrimaryButton from "./PrimaryButton";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

function AuthForm() {
    return (
        <div className="py-20 flex flex-col w-1/3 bg-darkBg rounded-3xl -translate-x-20 gap-4">
            <p className="text-3xl font-black mx-auto">LOGO</p>
            <div className="flex gap-5 bg-zinc-800 p-4 mx-auto rounded-xl">
                <PrimaryButton onClick={() => {}}>Sign Up</PrimaryButton>
                <PrimaryButton onClick={() => {}} disabled>
                    Sign In
                </PrimaryButton>
            </div>
            <form className="flex flex-col h-full gap-4 px-6">
                <Input
                    label="Username"
                    name="username"
                    type="string"
                    placeHolder="Enter Your Username..."
                />
                <Input
                    label="Email"
                    name="email"
                    type="string"
                    placeHolder="Enter Email..."
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeHolder="Enter Password..."
                />
                <Input
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    placeHolder="Enter Your Password Again"
                />
                <SubmitButton>Let&rsquo;s Start</SubmitButton>
            </form>
        </div>
    );
}

export default AuthForm;
