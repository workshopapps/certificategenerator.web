import React from 'react'
import "./textarea.scss"

const TextArea = ({label, placeholder}) => {
  return (
    <div className="textareaContainer">
      <label
        htmlFor={label}
        className="textareaContainetextareaContainer__label"
      >
        {label}
      </label>
      <textarea
        className="textareaContainer__input"
        placeholder={placeholder}
        aria-placeholder={placeholder}
      />
    </div>
  );
}

export default TextArea;