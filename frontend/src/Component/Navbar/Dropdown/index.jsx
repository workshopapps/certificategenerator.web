import React from 'react'
import './dropdown.style.scss'
import Avatar from '../../../assets/Ellipse4.png'
import CaretDown from '../../../assets/svgs/caret-down.svg'

export default function DropDown() {
  return (
    <div className="dropdown-container">
        <div className="dropdown__items">
        <h3>My Account</h3>
        <img src={CaretDown} alt='caret-down' />
       </div>
        <span className="dropdown__img">
          <img src={Avatar} alt="avatar" />
        </span>
    </div>
  )
}
