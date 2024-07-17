import Link from "next/link";
import React from "react";

interface ButtonProps {
    href: string;
    children: string;
    disabled?: boolean;
    size: "small" | "medium" | "big";
    color?: "green" | "white";
}

export default function PrimaryButton({
    href,
    disabled,
    children,
    size,
    color = "green",
}: ButtonProps) {
    function getPadding(size: "small" | "medium" | "big"): string {
        switch (size) {
            case "small":
                return "5";
            case "medium":
                return "7";
            case "big":
                return "12";
        }
    }

    function getColor(color: string) {
        if (color === "green") return "myGreen";
        else if (color === "white") return "zinc-100";
    }

    return (
        <Link
            className={`${
                disabled
                    ? "bg-transparent hover:ring-1"
                    : `bg-${getColor(color)}`
            }  font-semibold ${
                size === "small" ? "rounded-full" : "rounded-md"
            } px-${getPadding(size)} py-2  hover:ring-myGreen  ${
                color === "white" && "text-zinc-900"
            }`}
            href={href}
        >
            {children}
        </Link>
    );
}
