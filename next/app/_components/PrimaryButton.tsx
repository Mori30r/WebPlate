import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: string;
}

export default function PrimaryButton({ onClick, children }: ButtonProps) {
    return (
        <button
            className="bg-green font-medium rounded-md px-14 py-3 hover:ring-1 hover:ring-green hover:bg-transparent"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
