import React from 'react'
import './button.scss'

const Button = ({children, name, width, className, onClick, disabled}) => {
  return (
    <button className={`btn ${className} `} style={{
      width: width
    }} onClick={onClick} disabled={disabled}>{children} {name}</button>
  )
}

export default Button