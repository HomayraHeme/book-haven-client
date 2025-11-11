import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "transparent",
            }} className="pb-100"
        >
            <InfinitySpin
                width="150"
                color="#4fa94d"
            />
        </div>
    );
};

export default Spinner;
