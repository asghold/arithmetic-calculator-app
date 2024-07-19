import React from "react";

const Balance = ({balance}) => {
    return (
        <div>Balance: <span>${balance ? balance : 100}</span></div>
    );
}

export default Balance;