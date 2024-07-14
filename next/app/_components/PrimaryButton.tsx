import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: string;
    disabled?: boolean;
}

export default function PrimaryButton({
    onClick,
    disabled,
    children,
}: ButtonProps) {
    return (
        <button
            className={`${
                disabled ? "bg-transparent hover:ring-1" : "bg-myGreen"
            }  font-medium rounded-md px-12 py-2  hover:ring-myGreen `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
