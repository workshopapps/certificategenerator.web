import React from 'react'
import './input.scss'


const Inputfield = ({label,type, placeholder}) => {
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
      />
    </div>
  );
}

export default Inputfield