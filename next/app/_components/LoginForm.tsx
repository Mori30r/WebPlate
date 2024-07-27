"use client";

import React, { useTransition } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { loginSchema } from "../_lib/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserLogin } from "@/types/global";
import { signInAction } from "@/app/_lib/actions";

function LoginForm() {
    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const [isPending, startTransition] = useTransition();

    function handleFormSubmit(data: UserLogin) {
        startTransition(() => {
            signInAction(data);
        });
    }

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
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
            <SubmitButton disabled={isPending} className="mx-auto">
                {isPending ? "Loading..." : "Login"}
            </SubmitButton>
        </form>
    );
}

export default LoginForm;
