import React from "react";
import "./EqualButton.css";

export default function EqualButton(props) {
  return (
    <div
      className="equal-btn"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};