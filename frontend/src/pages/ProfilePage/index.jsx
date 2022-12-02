import React from "react";
import Modal from "../../Component/Modal";
import { useNavigate } from "react-router-dom";
import "./profile.style.scss";
import Avatar from "../../assets/images/Ellipse4.png";
import Input from "../../Component/Input";
import Button from "../../Component/button";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleSignout = e => {
    e.preventDefault();
    console.log("Logout");
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are your sure you want to logout your account")) {
      // CLEAR DATA FROM STORAGE
      localStorage.clear();
      sessionStorage.clear();

      //navigate back to homepage
      navigate("/");
    } else {
      return false;
    }
  };
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
              <span></span>
              <span>Lagos, Nigeria</span>
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

          <div className="form">
            <h2>Manage Profile</h2>
            <form action="">
              <div className="form-group">
                <Input label={"Name"} placeholder="Name" type="text" />
                {/* <label>Name</label>
              <input className="form-control" type="text" placeholder="Name" /> */}
              </div>
              <div className="form-group">
                <Input label={"Job"} placeholder="Job" type="text" />

                {/* <label>Job</label>
              <input className="form-control" type="text" placeholder="Job" /> */}
              </div>
              <div className="form-group">
                <Input label={"Location"} placeholder="Location" type="text" />

                {/* <label>Location</label>
              <input
                className="form-control"
                type="text"
                placeholder="Location"
              /> */}
              </div>
              <div className="form-group">
                <Input label={"Email"} placeholder="Email" type="email" />

                {/* <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="E-mail"
              /> */}
              </div>
              <div className="form-group">
                <Input
                  label={"Phone Number"}
                  placeholder="(316) 555-0116"
                  type="tel"
                />

                {/* <label>Phone Number</label>
              <input
                className="form-control"
                type="tel"
                placeholder="(316) 555-0116"
              /> */}
              </div>
              <div className="form-btn-wrapper">
                <Button>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
