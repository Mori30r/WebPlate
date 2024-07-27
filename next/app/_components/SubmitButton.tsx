import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonPropsTypes {
    children: string | React.ReactElement;
    className?: string;
    disabled?: boolean;
}

function SubmitButton({
    children,
    className,
    disabled,
}: SubmitButtonPropsTypes) {
    return (
        <button
            className={`${className} text-sm bg-myRed py-3 px-10 rounded-xl ${
                disabled && "bg-zinc-700 cursor-not-allowed"
            }`}
        >
            {children}
        </button>
    );
}

export default SubmitButton;
