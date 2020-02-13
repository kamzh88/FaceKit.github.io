import React from "react";

function Wrapper(props) {
    return (
        <div style={{ maxWidth: 400, padding: 16, margin: "auto" }}> {props.children}</div>
    )
};

export default Wrapper;