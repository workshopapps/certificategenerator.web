import "./input.style.scss";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({
  type,
  placeholder,
  value,
  callback,
  id,
  label,
  style,
  className,
  error,
  errorMessage = "Invalid Message",
  eyecon
}) => {
  const [pw, setPw] = useState("text");
  const handleToggle = () => {
    console.log(222);
    if (pw === "password") {
      setPw("text");
    } else {
      setPw("password");
    }
  };
  return (
    <>
      {type === "submit" ? (
        <div className="input">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onClick={callback}
            style={style}
          />
        </div>
      ) : (
        <div className="input">
          {label && (
            <label htmlFor={id} className="label">
              {label}
            </label>
          )}
          {type === "test" ? (
            <input
              name={id}
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={callback}
              style={style}
              className={` ${className} `}
            />
          ) : (
            <input
              name={id}
              id={id}
              type={pw}
              placeholder={placeholder}
              value={value}
              onChange={callback}
              style={style}
              className={` ${className} `}
            />
          )}
          {/* <input
            name={id}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={callback}
            style={style}
            className={` ${className} `}
          /> */}

          {type === "password" && eyecon && (
            <span onClick={handleToggle}>
              {pw === "text" ? (
                <AiOutlineEye size={25} className="eye" />
              ) : (
                <AiOutlineEyeInvisible size={25} className="eye" />
              )}
            </span>
          )}
          {error && <p>{errorMessage}</p>}
        </div>
      )}
    </>
  );
};

export default Input;
