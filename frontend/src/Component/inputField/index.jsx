import React from 'react'
import './input.scss'

const Inputfield = ({label,type, placeholder, onChange, value, pattern, maxlength}) => {
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
        value={value}
        pattern={pattern}
        maxlength={maxlength}
      />
    </div>
  );
}

export default Inputfield