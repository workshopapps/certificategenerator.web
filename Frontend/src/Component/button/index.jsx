import React from 'react'
import './button.scss'

const Button = ({children, name, width}) => {
  return (
      <button className='btn' style={{
        width: width
    }}>{children} {name}</button>
  )
}

export default Button
