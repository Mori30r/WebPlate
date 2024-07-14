import React from "react";
import EnjoyCard from "@/app/_components/EnjoyCard";
import AuthForm from "@/app/_components/AuthForm";

export default function Page() {
    return (
        <div className="h-full flex justify-between">
            <EnjoyCard />
            <AuthForm />
        </div>
    );
}
