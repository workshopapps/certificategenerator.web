import React from 'react'
import './input.scss'



const Inputfield = ({label,type, placeholder, onChange, pattern, value}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={label} className="inputContainer__label">
        {label}
      </label>
      <input
        type={type}
        className="inputContainer__input"
        placeholder={placeholder}
        aria-placeholder={placeholder}
        onChange={onChange}
        pattern={pattern}
        value={value}
      />
    </div>
  );
}

export default Inputfield