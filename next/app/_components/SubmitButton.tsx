import React from "react";

interface SubmitButtonPropsTypes {
    children: string;
    className?: string;
}

function SubmitButton({ children, className }: SubmitButtonPropsTypes) {
    return (
        <button
            className={`${className} text-sm bg-myRed py-3 px-10 rounded-xl`}
        >
            {children}
        </button>
    );
}

export default SubmitButton;
