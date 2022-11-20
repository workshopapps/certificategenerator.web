import React from 'react'
import './button.scss'

const Button = ({children, width}) => {
  return (
      <button className='btn' style={{
        width: width
    }}>{children}</button>
  )
}

export default Button