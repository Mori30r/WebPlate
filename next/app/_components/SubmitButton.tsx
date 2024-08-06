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
    const { pending } = useFormStatus();
    const isPending = pending || disabled;

    return (
        <button
            className={`${className} text-sm bg-myRed py-3 px-10 rounded-xl ${
                isPending && "bg-zinc-700 cursor-not-allowed"
            }`}
            type="submit"
        >
            {isPending ? "Loading..." : children}
        </button>
    );
}

export default SubmitButton;
