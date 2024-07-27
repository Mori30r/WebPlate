"use client";

import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../_lib/validators";
import { UserSignup } from "@/types/global";

function SignupForm() {
    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    async function handleSignup(userInput: UserSignup) {
        // signup(userInput);
        console.log(userInput);
        // reset();
    }

    return (
        <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-col h-full gap-4 px-6"
        >
            <div className="flex justify-between gap-4">
                <Input
                    register={{ ...register("first_name") }}
                    control={control}
                    label="First Name"
                    id="first_name"
                    type="string"
                    placeHolder="Enter Your First Name..."
                />
                <Input
                    register={{ ...register("last_name") }}
                    control={control}
                    label="Last Name"
                    id="last_name"
                    type="string"
                    placeHolder="Enter Your Last Name..."
                />
            </div>
            <Input
                register={{ ...register("email") }}
                control={control}
                label="Email"
                id="email"
                type="string"
                placeHolder="Enter Email..."
            />
            <Input
                register={{ ...register("password") }}
                control={control}
                label="Password"
                id="password"
                type="password"
                placeHolder="Enter Password..."
            />
            <Input
                register={{ ...register("password2") }}
                control={control}
                label="Confirm Password"
                id="password2"
                type="password"
                placeHolder="Enter Your Password Again"
            />
            <SubmitButton className="mx-auto">Let&rsquo;s Start</SubmitButton>
        </form>
    );
}

export default SignupForm;
