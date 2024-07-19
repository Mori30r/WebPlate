import React from "react";
import Header from "../_components/Header";
import CategoriesSideBar from "../_components/CategoriesSideBar";

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-5">
            <Header />
            <div className="grid grid-cols-[75px_1fr] gap-5">
                <CategoriesSideBar />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
