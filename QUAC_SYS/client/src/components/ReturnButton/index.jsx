import React from "react";

export function ReturnDeshboard() {

    function Replace () {
        window.location.replace("/dashboard");
    }

    return (
        <>
            <button onClick={Replace}>Home</button>
        </>
    );
}