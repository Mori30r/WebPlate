import Link from "next/link";
import React from "react";
import Image from "next/image";

import { HiShoppingBag } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";
import Devil from "@/public/images/devil.png";
import { HeaderLinkPropTypes, HeaderToolbarPropTypes } from "@/types/global";

function Header() {
    return (
        <div className="grid grid-rows-1 grid-cols-[1fr_2fr_1fr] max-h-[100px] bg-darkBg px-10 py-4 mt-5 rounded-2xl items-center">
            <div>
                <Link href="/home" className="font-black">
                    LOGO
                </Link>
            </div>
            <div className="flex gap-12 mx-auto">
                <HeaderLink href="/menu">Menu</HeaderLink>
                <HeaderLink href="">Delivery Tracker</HeaderLink>
                <HeaderLink href="">Restaurants</HeaderLink>
                <HeaderLink href="">Help Center</HeaderLink>
            </div>
            <div className="flex gap-5 justify-end items-center">
                <HeaderToolbarItem href="" color="bg-zinc-800">
                    <HiHeart size={22} color="red" />
                </HeaderToolbarItem>
                <HeaderToolbarItem href="/order" color="bg-myGreen">
                    <HiShoppingBag size={22} />
                </HeaderToolbarItem>
                <HeaderToolbarItem href="" color="bg-purple-500" isProfile>
                    <Image src={Devil} width={22} alt="devil" />
                </HeaderToolbarItem>
            </div>
        </div>
    );
}

function HeaderLink({ children, href }: HeaderLinkPropTypes) {
    return (
        <Link href={href} className="text-sm font-semibold">
            {children}
        </Link>
    );
}

function HeaderToolbarItem({
    children,
    color,
    isProfile,
    href,
}: HeaderToolbarPropTypes) {
    return (
        <Link
            href={href}
            className={`${color} ${
                isProfile ? "rounded-full" : "rounded-xl"
            } p-3`}
        >
            {children}
        </Link>
    );
}

export default Header;
