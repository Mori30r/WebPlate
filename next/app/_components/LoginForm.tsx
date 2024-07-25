"use client";

import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { loginSchema } from "../_lib/validators";
import { yupResolver } from "@hookform/resolvers/yup";
function LoginForm() {
    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(loginSchema),
    });

    async function handleLogin(userInput: { email: string; password: string }) {
        // signup(userInput);
        console.log(userInput);
        // reset();
    }
    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex justify-around flex-col h-full gap-4 px-6"
        >
            <div className="flex flex-col gap-4">
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
            </div>
            <SubmitButton className="mx-auto">Login</SubmitButton>
        </form>
    );
}

export default LoginForm;
