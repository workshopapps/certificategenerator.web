import "./input.style.scss";
import React from "react";

const Input = ({ type, placeholder, value, callback, id, label, style }) => {
  return (
    <>
      {type === "submit" ? (
        <>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onClick={callback}
            style={style}
          />
        </>
      ) : (
        <>
          <label htmlFor={id} className="label">
            {label}
          </label>
          <input
            name={id}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={callback}
            style={style}
          />
        </>
      )}
    </>
  );
};

export default Input;
