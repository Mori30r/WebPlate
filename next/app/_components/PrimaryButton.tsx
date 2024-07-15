import Link from "next/link";
import React from "react";

interface ButtonProps {
    href: string;
    children: string;
    disabled?: boolean;
}

export default function PrimaryButton({
    href,
    disabled,
    children,
}: ButtonProps) {
    return (
        <Link
            className={`${
                disabled ? "bg-transparent hover:ring-1" : "bg-myGreen"
            }  font-medium rounded-md px-12 py-2  hover:ring-myGreen `}
            href={href}
        >
            {children}
        </Link>
    );
}
