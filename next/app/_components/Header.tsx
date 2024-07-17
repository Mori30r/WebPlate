import Link from "next/link";
import React from "react";
import Image from "next/image";

import { HiInboxArrowDown, HiAcademicCap } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";
import Devil from "@/public/images/devil.png";

function Header() {
    return (
        <div className="grid grid-rows-1 grid-cols-[1fr_2fr_1fr] max-h-[100px] bg-darkBg px-10 py-4 mt-5 rounded-2xl items-center">
            <div>
                <Link href="/" className="font-black">
                    LOGO
                </Link>
            </div>
            <div className="flex gap-12 mx-auto">
                <HeaderLink>Menu</HeaderLink>
                <HeaderLink>Delivery Tracker</HeaderLink>
                <HeaderLink>Restaurants</HeaderLink>
                <HeaderLink>Help Center</HeaderLink>
            </div>
            <div className="flex gap-5 justify-end items-center">
                <HeaderToolbarItem color="bg-zinc-800">
                    <HiHeart size={22} color="red" />
                </HeaderToolbarItem>
                <HeaderToolbarItem color="bg-myGreen">
                    <HiInboxArrowDown size={22} />
                </HeaderToolbarItem>
                <HeaderToolbarItem color="bg-purple-500" isProfile>
                    <Image src={Devil} width={22} alt="devil" />
                </HeaderToolbarItem>
            </div>
        </div>
    );
}

interface HeaderLinkPropTypes {
    children: string;
}

function HeaderLink({ children }: HeaderLinkPropTypes) {
    return <span className="text-sm font-semibold">{children}</span>;
}

interface HeaderToolbarPropTypes {
    children: React.ReactElement;
    color: string;
    isProfile?: boolean;
}

function HeaderToolbarItem({
    children,
    color,
    isProfile,
}: HeaderToolbarPropTypes) {
    return (
        <div
            className={`${color} ${
                isProfile ? "rounded-full" : "rounded-xl"
            } p-3`}
        >
            {children}
        </div>
    );
}

export default Header;
