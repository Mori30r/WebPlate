import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
function LoginForm() {
    return (
        <form className="flex justify-around flex-col h-full gap-4 px-6">
            <div className="flex flex-col gap-4">
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
            </div>
            <SubmitButton className="mx-auto">Login</SubmitButton>
        </form>
    );
}

export default LoginForm;
