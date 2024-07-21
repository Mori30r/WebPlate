import Link from "next/link";
import React from "react";

interface ButtonProps {
    href: string;
    children: string;
    disabled?: boolean;
    bgColor?: "bg-myGreen" | "bg-zinc-100";
    textColor?: "text-zinc-800" | "text-zinc-100";
    paddingX?: "px-2" | "px-6" | "px-10";
    radius?: "rounded-full" | "rounded-md";
}

export default function PrimaryButton({
    href,
    disabled,
    children,
    bgColor = "bg-myGreen",
    textColor = "text-zinc-100",
    radius = "rounded-md",
    paddingX = "px-6",
}: ButtonProps) {
    const disabledStyles = disabled ? "bg-transparent hover:ring-1" : bgColor;

    return (
        <Link
            className={`${disabledStyles} ${radius} ${paddingX} ${textColor} py-2 hover:ring-myGreen font-semibold`}
            href={href}
        >
            {children}
        </Link>
    );
}
