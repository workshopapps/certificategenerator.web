import "./input.style.scss";
import React from "react";

const Input = ({ type, placeholder, value, callback, id, label }) => {
  return (
    <>
      {type === "submit" ? (
        <>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onClick={callback}
          />
        </>
      ) : (
        <>
          <label htmlFor={id} className="label">
            {label}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={callback}
          />
        </>
      )}
    </>
  );
};

export default Input;
