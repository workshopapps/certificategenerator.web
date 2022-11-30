import React from "react";
import "./button.scss";

// const Button = ({children, name, width, className}) => {
//   return (
//       <button className={`btn ${className} `} style={{
//         width: width
//     }}>{children} {name}</button>
//   )
// }

const Button = ({ text, callback, children, style, className }) => {
  // const styles = { style };
  return (
    <button
      type="button"
      onClick={callback}
      className={`btn ${className}`}
      style={style}
    >
      {children} {text}
    </button>
  );
};

export default Button;
