
import React from 'react'
import "./textarea.scss"


const TextArea = ({ label, placeholder, onChange, value, required
}) => {
  return (
    <div className="textareaContainer">
      <label htmlFor={label} className="textareaContainer__label">
        {label}
      </label>
      <textarea
        className="textareaContainer__input"
        placeholder={placeholder}
        aria-placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
};

export default TextArea;