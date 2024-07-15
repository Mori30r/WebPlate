import React from "react";

interface SubmitButtonPropsTypes {
    children: string;
}

function SubmitButton({ children }: SubmitButtonPropsTypes) {
    return (
        <button className="text-sm bg-myRed mx-auto py-3 px-10 rounded-xl">
            {children}
        </button>
    );
}

export default SubmitButton;
