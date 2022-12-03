import React from "react";
import "./button.scss";

const Button = ({ children, name, width, className, onClick, style }) => {
  return (
    <button className={`btn ${className} `} style={style} onClick={onClick}>
      {children} {name}
    </button>
  );
};

export default Button;
