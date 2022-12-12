import React, {useState} from "react";
import axios from 'axios'
import Modal from '../../Component/Modal'
import {useNavigate} from 'react-router-dom'
import "./profile.style.scss";
import Avatar from "../../assets/svgs/profileavatar.jpg"
import Input from "../../Component/Input";
import Loader from "../../Component/ButtonLoader";
import { Toast } from '../../Component/ToastAlert'
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [profileavatar, setprofileAvatar] = useState(null)
  const [myAvatar, setMyAvatar] = useState(null)
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
         await axios.delete('https://certgo.hng.tech/api/auth/logout')
          .then((res) => {       
               console.log('logged out:', res);
              setLoading(false);
              //navigate back to login
              navigate('/login') 
             localStorage.clear()
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
  <div className="profile-page">
    <div>
    <div className="user-info">
      <div className="user-avatar">
        <label><i className ="fa fa-plus"></i> </label>
        <img src={myAvatar || Avatar} className="avatar" alt="profile-pic"  />         
      </div>
        <form>
        <div style={{display:"flex", gap:"10px", cursor: "pointer", color:"#19a68e"}}>
          <label htmlFor="file" >upload image</label>
          <input type="file" style={{display: "none"}} id = "file" alt="pp" accept=".jpg, .png, .jpeg" className="avatar" onChange={handleUploadAvatar}></input>
          {/* <div onClick={uploadAvatar} className="imgbtn" >save image</div> */}
        </div> 
         
        </form>
      <div className="mb-2">          
        <form className="data-avatar">
          <div className="avatar-name">{data.name}</div>
          <div className="avatar-job" >{data.job}</div>
          <div  className="avatar-location">{data.location}</div>
        </form>           
      </div>
      <div className="btn-wrapper">
        <button onClick={handleLogout} style={loading ? {background: '#f84343', cursor: 'not-allowed'} : {background: 'transparent', cursor: 'pointer'}}>{loading ? <Loader /> : <span>Log Out</span>}</button>
        <button onClick={handleDelete} style={isLoadingDelete ? {background: '#f84343', cursor: 'not-allowed'} : {background: 'transparent', cursor: 'pointer'}}>{isLoadingDelete ? <Loader /> : <span>Delete Account</span>}</button>
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