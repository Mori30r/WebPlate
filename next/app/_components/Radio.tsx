import React from "react";

interface Props {
    children: string;
    name: string;
    value: string;
    id: string;
}

function RadioInput({ children, name, value, id }: Props) {
    return (
        <div className="flex gap-2 items-center">
            <div className="flex items-center relative">
                <input
                    className="peer appearance-none w-4 h-4 border-2 border-zinc-600 rounded-full checked:border-myGreen"
                    type="radio"
                    name={name}
                    value={value}
                    id={id}
                />
                <div className="absolute inset-0 m-auto w-2 h-2 rounded-full peer-checked:bg-myGreen peer-checked:peer-disabled:bg-gray-400" />
            </div>
            <label htmlFor={id} className="text-sm font-medium">
                {children}
            </label>
        </div>
    );
}

export default RadioInput;
