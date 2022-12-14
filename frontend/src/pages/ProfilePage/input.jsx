import React from "react";
import Input from "../../Component/Input";

const Inputfield = ({
  label,
  type,
  placeholder,
  onChange,
  value,
  callback,
  id,
  pattern,
  maxlength,
  required
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "5px 10px"
      }}
    >
      <label
        style={{
          marginLeft: "15px",
          fontSize: "0.9rem",
          color: "rgba(0, 0, 0, 0.6)"
        }}
      >
        {label}
      </label>
      <Input
        style={{
          border: "none",
          height: "25px",
          color: "#000000",
          fontWeight: "500"
        }}
        callback={callback}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Inputfield;
