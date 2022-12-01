import React from "react";
import {useNavigate} from 'react-router-dom'
import "./profile.style.scss";
import Avatar from "../../assets/images/Ellipse4.png"

const ProfilePage = () => {
  const navigate = useNavigate

  const handleSignout = () =>{
    navigate('/')
  }
  return (
    <div className="profile-page">
      <div>
      <div className="user-info">
        <div className="user-avatar">
          <img src={Avatar} alt="profile-pic" />
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
          <button onClick={handleSignout}>Log Out</button>
        </div>
      </div>

      <div className="form">
        <h2>Manage Profile</h2>
        <form action="">
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" type="text" placeholder="Name"/>
            </div>
            <div className="form-group">
                <label>Job</label>
                <input className="form-control" type="text" placeholder="Job"/>
            </div>
            <div className="form-group">
                <label>Location</label>
                <input className="form-control" type="text" placeholder="Location"/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="email" placeholder="E-mail"/>
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input className="form-control" type="tel" placeholder="(316) 555-0116"/>
            </div>
            <div className="form-btn-wrapper">
                <button>Save Changes</button>
            </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
