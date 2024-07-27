"use client";

import React, { startTransition, useTransition } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../_lib/validators";
import { registerAction } from "../_lib/actions";
import { UserSignup } from "@/types/global";

function SignupForm() {
    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const [isPending, startTransition] = useTransition();

    function handleFormSubmit(data: UserSignup) {
        startTransition(() => {
            registerAction(data);
        });
    }

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
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
            <SubmitButton disabled={isPending} className="mx-auto">
                {isPending ? "Loading..." : "Let's Start"}
            </SubmitButton>
        </form>
    );
}

export default SignupForm;
