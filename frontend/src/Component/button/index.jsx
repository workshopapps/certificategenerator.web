import React from 'react'
import './button.scss'

const Button = ({children, name, width, className}) => {
  return (
      <button className={`btn ${className} `} style={{
        width: width
    }}>{children} {name}</button>
  )
}

export default Button