import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Toast} from '../../ToastAlert'
import {Link, useNavigate} from "react-router-dom"
import Loader from '../../ButtonLoader'
import './dropdown.style.scss'
import Avatar from '../../../assets/svgs/default-brandkit.svg'
import CaretDown from '../../../assets/svgs/caret-down.svg'

 function DropDown() {
   const baseURL = "https://certgo.hng.tech/api";
  const accessToken = JSON.parse(localStorage.getItem("userData")).token
  const [file, setFile] = useState('')
   
  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  const handleToggle = () => {
     let drop = document.querySelector(".drop")
     let caretDown = document.querySelector("#caret-down")
     drop.classList.toggle("hidden")
     caretDown.classList.toggle('caret-up')
  }
     
    useEffect(() => {
    const getFile = async (e) => {
      const res = await axiosPrivate.get("/users/brand-kit");
      console.log("Brand kit", res.data.brandkit);
      setFile(res.data.brandkit);
    }
    getFile();
  }, [])  

  return (
    <div>
       <div className="dropdown-container" onClick={handleToggle}>
        <div className="dropdown__items">
        <h3>My Account</h3>
        <img src={CaretDown} alt='caret-down' id='caret-down' />
       </div>
        <span className="dropdown__img">
          <img src={file || Avatar} alt="avatar" />
        </span>
    </div>
       <Drop />
    </div>
   
  )
}
  export const Drop = () => {
      const [loading, setLoading] = useState()
      const navigate = useNavigate()

  // Handle user Logout
  const handleLogout = async(e) =>{
    setLoading(true);
      e.preventDefault();  
         await axios.delete('https://certify-api.onrender.com/api/auth/logout')
          .then((res) => {       
             if(res.status === 200){
               console.log('logged out');
              setLoading(false);
              //navigate back to login
              navigate('/login') 
             localStorage.clear()
             }
          }).catch(err =>{
            console.log(err || 'couldnt log out')
            setLoading(false)
                  Toast.fire({
                icon: "error",
                title: "Error logging out"
              });
          }) 
  }
    return(
      <div className='drop'>
        <Link to="/profile"><span className='drop__item'>Edit Profile</span> </Link> 
        <span className='drop__item' onClick={handleLogout}>
          {loading ? <span>Logging out...</span> : <span>Log out</span>}
        </span>
        <Link to="/dashboard"><span className='drop__item'>Manage Account</span></Link> 
      </div>
    )
  }

export default DropDown