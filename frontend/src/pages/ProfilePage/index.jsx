import React, {useState} from "react";
import axios from 'axios'
import Modal from '../../Component/Modal'
import {useNavigate} from 'react-router-dom'
import "./profile.style.scss";
import Avatar from "../../assets/images/Ellipse4.png"
import Input from "../../Component/Input";
import Loader from "../../Component/ButtonLoader";
import { Toast } from '../../Component/ToastAlert'
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const[data, setData]= useState({
  name:"",
  job:"",
  location:"",
  phoneNumber:"",
  email:""
})
const [displayData, setdisplayData] = useState({})


const userId = localStorage.getItem("user");

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
  
  const url = "https://certgo.hng.tech/api/profile";
  const handleOnchange = e => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    //console.log(e)
  };

  const userData = JSON.parse(localStorage.getItem("userData"))
  const token = userData.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
 
      function getDATA(){
        fetch(url,
          {
            headers
          }
          )
          .then((res) => res.json())
          .then((res)=>{
            setData(res.data.profile)
          
          })
    }
    useEffect(() =>{
      getDATA()
    },[])

  const Submit = async e => {
    e.preventDefault();
    
    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = userData.token;
    //console.log(token)
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      //console.log(token)
      const response = await axios.patch(
        url,
        {
          name: data.name,
          job: data.job,
          location: data.location,
          phoneNumber: data.phoneNumber,
          email: data.email
        },
        {
          headers
        }
      );
      console.log(response)
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: response.message
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              callback={handleOnchange}
                id="name" 
                type="text" 
                placeholder="Name"
                value={data.name}
                />
            <Input className="form-group"
              label={"Jobs"}
             callback={handleOnchange} 
                id="job" 
                type="text" 
                placeholder="Job"
                value={data.job}
                />

              <Input className="form-group"
                label={"Location"}
                callback={handleOnchange} 
                id="location" 
                type="text" 
                placeholder="Location"
                value={data.location}
                />

            <Input className="form-group"
                label={"Email"}
                callback={handleOnchange} 
                id="email" 
                type="email" 
                placeholder="E-mail"
                value={data.email}
                />

            <Input className="form-group"
                label={"Phone Number"}
                callback={handleOnchange} 
                id="phoneNumber" 
                type="tel" 
                placeholder="(316) 555-0116"
                value={data.phoneNumber}
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