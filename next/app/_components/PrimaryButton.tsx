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
                return "3";
            case "medium":
                return "6";
            case "big":
                return "10";
        }
    }

    function getColor(color: string) {
        if (color === "green") return "bg-myGreen";
        else if (color === "white") return "bg-zinc-100";
    }

    const smallStyles = "rounded-full px-5 py-2 hover:ring-myGreen";
    const notSmallStyles = "rounded-md px-5 py-2 hover:ring-myGreen";

    return (
        <Link
            className={`${
                disabled ? "bg-transparent hover:ring-1" : `${getColor(color)}`
            } font-semibold ${
                size === "small" ? "rounded-full" : "rounded-md"
            } px-${getPadding(size)} py-2 hover:ring-myGreen  ${
                color === "white" && "text-zinc-800"
            }`}
            href={href}
        >
            {children}
        </Link>
    );
}
