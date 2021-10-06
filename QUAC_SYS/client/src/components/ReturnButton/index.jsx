import React from "react";

export function ReturnDeshboard() {

    function Replace () {
        window.location.replace("/dashboard");
    }

    return (
        <>
            <button className="btnhome"onClick={Replace}>Home</button>
        </>
    );
}