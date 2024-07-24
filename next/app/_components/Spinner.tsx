import React from "react";
function Spinner() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-myGreen"></div>
        </div>
    );
}

export default Spinner;
