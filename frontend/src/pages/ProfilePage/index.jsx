import React, {useState} from "react";
import axios from 'axios'
import Modal from '../../Component/Modal'
import {useNavigate} from 'react-router-dom'
import "./profile.style.scss";
import Avatar from "../../assets/images/Ellipse4.png"
import Input from "../../Component/Input";
import Loader from "../../Component/ButtonLoader";
import { Toast } from '../../Component/ToastAlert'

const ProfilePage = () => {
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const[data,setData]= useState({
  name:"",
  job:"",
  location:"",
  phoneNumber:"",
  useremail:""
})

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
             localStorage.removeItem('token');
             localStorage.removeItem('user');
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


  
  const url= "https://certify-api.onrender.com/api/pricing"
  function handlePost(e){
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
    console.log(newdata)
  }
  function Submit(e){
    e.preventDefault();
    axios.post(url,{
      name:data.name,
      job:data.job,
      location:data.location,
      phoneNumber:data.phoneNumber,
      useremail:data.useremail
    })
    .then(res=>{
      console.log(res.data)
    })
  }
  return (
    <div className="profile-page">
      <div>
      <div className="user-info">
        <div className="user-avatar">
          <img src={Avatar} className="avatar" alt="profile-pic" />
        </div>
        <div className="mb-2">
          <h3>Olamiposi Benjamin</h3>
          <p className="job-title">Advisor at Stripe Inc.</p>
          <div className="location-wrapper">
            <span></span><span>Lagos, Nigeria</span>
          </div>
        </div>
        <div className="mb-2">
          <p>Lite Plan</p>
          <span className="lite-plan-exp">Expires 23rd December 2022</span>
        </div>
        <div className="mb-2">
          <p>Last bulk certificate generated</p>
          <span className="last-gen-date">12th November 2022</span>
        </div>

        <div className="btn-wrapper">
          <button onClick={handleLogout} style={loading ? {background: '#f84343', cursor: 'not-allowed'} : {background: 'transparent', cursor: 'pointer'}}>{loading ? <Loader /> : <span>Log Out</span>}</button>
        </div>
      </div>

      <div className="form">
        <h2>Manage Profile</h2>
        <form onSubmit={(e)=>Submit(e)} >

            <Input className="form-group"
              label={"Name"}
              onClick={handlePost}
                id="form-control" 
                type="text" 
                placeholder="Name"
                />
            <Input className="form-group"
              label={"Jobs"}
             onClick={handlePost} 
                id="form-control" 
                type="text" 
                placeholder="Job"
                />

              <Input className="form-group"
                label={"Location"}
                onClick={handlePost} 
                id="form-control" 
                type="text" 
                placeholder="Location"
                />

            <Input className="form-group"
                label={"Email"}
                onClick={handlePost} 
                id="form-control" 
                type="email" 
                placeholder="E-mail"
                />

            <Input className="form-group"
                label={"Phone Number"}
                onClick={handlePost} 
                id="form-control" 
                type="tel" 
                placeholder="(316) 555-0116"
                />

            <div id="postbtnid" className="form-btn-wrapper">
                <button onSubmit={Submit}>Save Changes</button>
            </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;