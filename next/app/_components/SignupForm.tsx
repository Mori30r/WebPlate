"use client";

import React from "react";
import PrimaryButton from "./PrimaryButton";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

function SignupForm() {
    return (
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
    );
}

export default SignupForm;
