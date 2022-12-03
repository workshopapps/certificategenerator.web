import "./input.style.scss";
import React from "react";

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
  errorMessage = "Invalid Message"
}) => {
<<<<<<< HEAD
=======
  const [pw, setPw] = useState("text");
  const handleToggle = () => {
    console.log(222);
    if (pw === "password") {
      setPw("text");
    } else {
      setPw("password");
    }
  };
>>>>>>> dec6d6d (fixed login page)
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
          {error && <p>{errorMessage}</p>}
        </div>
      )}
    </>
  );
};

export default Input;
