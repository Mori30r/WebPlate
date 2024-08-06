"use client";

import React, { useState } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { loginSchema } from "../_lib/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInAction } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";

function LoginForm() {
    const { register, handleSubmit, control }: any = useForm({
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter();

    const [error, setError] = useState("");

    async function handleFormSubmit(data: any) {
        const res: any = await signInAction(data);

        if (res?.error) {
            setError(res?.error);
        } else {
            router.replace("/dashboard/home");
        }
    }

    return (
        <form
            action={handleSubmit(handleFormSubmit)}
            onChange={() => setError("")}
            className="flex justify-around flex-col h-full gap-4 px-6"
        >
            <div className="flex flex-col gap-4">
                {error && (
                    <p className="text-myRed font-medium text-sm">{error}</p>
                )}
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
