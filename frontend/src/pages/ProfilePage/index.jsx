import React, {useState} from "react";
import axios from 'axios'
import Modal from '../../Component/Modal'
import {useNavigate} from 'react-router-dom';
import "./profile.style.scss";
import Avatar from "../../assets/svgs/profileavatar.jpg";
import Input from "../../Component/Input";
import Loader from "../../Component/ButtonLoader";
import { Toast } from '../../Component/ToastAlert';
import Modalpro from "./modalpage";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [profileavatar, setprofileAvatar] = useState(null)
  const [myAvatar, setMyAvatar] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const[data, setData]= useState({
  name:"",
  job:"",
  location:"",
  phoneNumber:"",
  email:""
})

  
  

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
            setMyAvatar(res.data.profile.avatar || Avatar)
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

  function handleDelete(){
    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = userData.token;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    setIsLoadingDelete(true)
    fetch(url,
      {
        method: "DELETE",
        headers
      }
      )
      .then((res) => res.json())
      .then((res)=>{
        //setData(res.data.profile)
        console.log(res.data)
        console.log("Account deleted")   
        navigate("/signup")   
        localStorage.clear()  
      })
      .catch(err=>console.log(console.error()))
      .finally(()=>setIsLoadingDelete(false))   
}

function handleUploadAvatar(e){
  setprofileAvatar(e.target.files[0])
  setMyAvatar(URL.createObjectURL(e.target.files[0]))
  uploadAvatar(e.target.files[0])
}

async function uploadAvatar(image){
  //image.preventDefault()
  if(image){
    let formData = new FormData();
    formData.append("avatar", image);
    setMyAvatar(URL.createObjectURL(image))
    console.log(formData)
    const response = await fetch('https://certgo.hng.tech/api/profile/avatar',{
        headers: {
          //"Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`            
        },
        method: "POST",
        body: formData,           
      });
      console.log(formData)
      const data = await response.json()
      setMyAvatar(data.data.avatar)
      
      console.log(data)
  }
    //console.log(profileavatar)
 }

 return (
  <div className="parent">
    {openModal && (<Modalpro onClose= {()=> setOpenModal(false)} />) }
  <div className="profile-page">
    <div className="user-info">      
      <div className="user-avatar">
        <label><i className ="fa fa-plus"></i> </label>
        <img src={myAvatar || Avatar} className="avatar" alt="profile-pic"  />         
      </div>
        <form className="form-details">          
        <div className="profile-editor" onClick={() => setOpenModal(!openModal)}>edit</div>         
        </form>
        
      <div className="profileFormCont">          
        <form className="data-avatar">
          <div className="avatar-name"><span className="profileData1">NAME:</span> <span className="profileData">{data.name || " Input your name"}</span></div>
          <div className="line"></div>
          <div className="avatar-job" ><span className="profileData1">JOB:</span> <span className="profileData">{data.job || " Input your job "}</span></div>
          <div className="line"></div>
          <div  className="avatar-location"><span className="profileData1">LOCATION:</span> <span className="profileData">{data.location || " Input your location"}</span></div>
          <div className="line"></div>
          <div  className="avatar-email"><span className="profileData1">EMAIL ADDRESS:</span> <span className="profileData emailavatar">{data.email || " Input your email"}</span></div>
          <div className="line"></div>
          <div  className="avatar-phone"><span className="profileData1">PHONE NUMBER:</span> <span className="profileData">{data.phoneNumber || " Input your phone number"}</span></div>
        </form>                  
      </div>
      
    </div>
    
    
  </div>
  </div>
);
};

export default ProfilePage;