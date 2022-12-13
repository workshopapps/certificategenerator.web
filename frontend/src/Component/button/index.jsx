import React from "react";
import "./button.scss";

const Button = ({
  children,
  disabled,
  name,
  width,
  type,
  className,
  onClick,
  style
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${className} `}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children} {name}
    </button>
  );
};

export default Button;
