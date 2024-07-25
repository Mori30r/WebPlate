import React from "react";
import { useFormState } from "react-hook-form";

interface InputPropTypes {
    id: string;
    type: string;
    label: string;
    placeHolder: string;
    register: any;
    control: any;
}

function Input({
    id,
    type,
    label,
    placeHolder,
    register,
    control,
}: InputPropTypes) {
    const { errors } = useFormState({ control });
    const error = errors?.[id]?.message?.toString();
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xs" htmlFor={id}>
                {label}
            </label>
            <input
                className={`rounded-md text-xs bg-zinc-800 p-3 placeholder-zinc-500 border-0 focus:outline-none ${
                    error
                        ? "ring-1 ring-myRed"
                        : "focus:ring-1 focus:ring-inset focus:ring-myGreen "
                }`}
                type={type}
                placeholder={placeHolder}
                id={id}
                {...register}
            />
            {errors?.[id] && <p className="text-xs text-myRed">{error}</p>}
        </div>
    );
}

export default Input;
