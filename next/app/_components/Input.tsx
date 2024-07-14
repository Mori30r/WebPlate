import React from "react";

interface InputPropTypes {
    name: string;
    type: string;
    label: string;
    placeHolder: string;
}

function Input({ name, type, label, placeHolder }: InputPropTypes) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xs" htmlFor={name}>
                {label}
            </label>
            <input
                className="rounded-md text-xs bg-zinc-800 px-3 py-2 placeholder-zinc-500"
                type={type}
                placeholder={placeHolder}
                name={name}
            />
        </div>
    );
}

export default Input;
