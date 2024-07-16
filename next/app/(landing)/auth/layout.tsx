import React from "react";
import EnjoyCard from "@/app/_components/EnjoyCard";
import AuthSwitch from "@/app/_components/AuthSwitch";

interface AuthlayoutPropTypes {
    children: React.ReactElement;
}

function AuthLayout({ children }: AuthlayoutPropTypes) {
    return (
        <div className="max-w-8xl flex justify-between h-screen items-center">
            <div className="flex flex-col w-1/2 my-7 self-end">
                <EnjoyCard />
                <p className="text-justify text-sm px-32 py-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam repudiandae in sint rerum doloremque at facilis
                    odio asperiores nam, eaque dolores harum omnis repellendus,
                    quae, laudantium reiciendis quia delectus atque?
                </p>
            </div>
            <div className="py-10 flex flex-col w-1/3 bg-darkBg rounded-3xl mx-auto gap-4 max-h-[620px]]">
                <p className="text-3xl font-black mx-auto">LOGO</p>
                <AuthSwitch />
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
