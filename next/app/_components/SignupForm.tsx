"use client";

import React, { startTransition, useState, useTransition } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../_lib/validators";
import { registerAction, signInAction } from "../_lib/actions";
import { UserSignup } from "@/types/global";
import { useRouter } from "next/navigation";

function SignupForm() {
    const { register, handleSubmit, control, reset }: any = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const [error, setError] = useState("");
    const router = useRouter();

    async function handleFormSubmit(data: UserSignup) {
        const res = await registerAction(data);
        if (res?.error) {
            setError(res?.error);
        } else {
            router.replace("/dashboard/home");
        }
    }

    return (
        <form
            action={handleSubmit(handleFormSubmit)}
            className="flex flex-col h-full gap-4 px-6"
        >
            <div className="flex justify-between gap-4">
                {error && (
                    <p className="text-myRed font-medium text-sm">{error}</p>
                )}
                <Input
                    register={{ ...register("first_name") }}
                    control={control}
                    label="First Name"
                    id="first_name"
                    type="string"
                    placeHolder="Enter Your First Name..."
                    defaultValue="test"
                />
                <Input
                    register={{ ...register("last_name") }}
                    control={control}
                    label="Last Name"
                    id="last_name"
                    type="string"
                    placeHolder="Enter Your Last Name..."
                    defaultValue="test"
                />
            </div>
            <Input
                register={{ ...register("email") }}
                control={control}
                label="Email"
                id="email"
                type="string"
                placeHolder="Enter Email..."
                defaultValue="test@test.com"
            />
            <Input
                register={{ ...register("password") }}
                control={control}
                label="Password"
                id="password"
                type="password"
                placeHolder="Enter Password..."
                defaultValue="test"
            />
            <Input
                register={{ ...register("password2") }}
                control={control}
                label="Confirm Password"
                id="password2"
                type="password"
                placeHolder="Enter Your Password Again"
                defaultValue="test"
            />
            <SubmitButton className="mx-auto">Let&rsquo;s Start</SubmitButton>
        </form>
    );
}

export default SignupForm;
