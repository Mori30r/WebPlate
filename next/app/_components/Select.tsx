import React from "react";

interface SelectProps {
    children: React.ReactElement[];
    label: string;
}

function Select({ children, label }: SelectProps) {
    return (
        <div className="flex flex-col gap-2 text-sm font-normal text-zinc-400">
            <label>{label}</label>
            <select className="w-full p-4 bg-zinc-800 rounded-md">
                {children}
            </select>
        </div>
    );
}

interface OptionProps {
    children: string;
}

function Option({ children }: OptionProps) {
    return <option value={children}>{children}</option>;
}

Select.Option = Option;

export default Select;
