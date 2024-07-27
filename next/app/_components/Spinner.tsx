import React from "react";

function Spinner({ size = "big" }: { size?: "small" | "big" }) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div
                className={`${
                    size == "big" ? " h-32 w-32" : "h-6 w-6"
                } animate-spin rounded-full border-t-2 border-b-2 border-myGreen`}
            ></div>
        </div>
    );
}

export default Spinner;
