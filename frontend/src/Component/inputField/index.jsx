import React from 'react'
import './input.scss'



const Inputfield = ({label,type, placeholder, onChange}) => {
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
      />
    </div>
  );
}

export default Inputfield