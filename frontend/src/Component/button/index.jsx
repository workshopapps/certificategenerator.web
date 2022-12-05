import React from "react";
import "./button.scss";

const Button = ({ children, disabled, name, width, className, onClick }) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${className} `}
      style={{
        width: width
      }}
      onClick={onClick}
    >
      {children} {name}
    </button>
  );
};

export default Button;
