import React from 'react'
import './button.scss'

const Button = ({children, name, width, className, onClick}) => {
  return (
      <button className={`btn ${className} `} style={{
        width: width
    }} onClick={onClick}>{children} {name}</button>
  )
}

export default Button