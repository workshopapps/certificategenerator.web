import React from "react";
import "./button.scss";

const Button = ({
  children,
  disabled,
  name,
  width,
  className,
  onClick,
  style
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${className} `}
      style={style}
      onClick={onClick}
    >
      {children} {name}
    </button>
  );
};

export default Button;
