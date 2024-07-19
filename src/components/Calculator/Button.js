import React from "react";
import "./Button.css";

export default function Button(props) {
    const isOperator = (value) => {
        return !isNaN(value) || value === "." || value === "="; 
    }
    

    return (
        <div className={`button-wrapper ${
                isOperator(props.children) ? null : "operator"
            }`}
            onClick={props.onClick}>
                {props.children}
        </div>
      );
}
