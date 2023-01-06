import React, { useState } from "react";
import axios from "axios";

import "./editmodal.style.scss";
import { useEffect } from "react";
import Inputfield from "../input";
import { baseURL } from "../../../api/axios";
import Avatar from "../assets/default-avatar.svg";
import { Toast } from "../../../Component/ToastAlert";

const Modalpro = ({ onClose }) => {
  const [profileavatar, setprofileAvatar] = useState(null);
  const [myAvatar, setMyAvatar] = useState(null);
  const [data, setData] = useState({
    name: "",
    job: "",
    location: "",
    phoneNumber: "",
    email: ""
  });

  const url = `${baseURL}/profile`;
  const handleOnchange = e => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  function getDATA() {
    fetch(url, {
      headers
    })
      .then(res => res.json())
      .then(res => {
        setData(res.data.profile);
        setMyAvatar(res.data.profile.avatar || Avatar);
      });
  }
  useEffect(() => {
    getDATA();
  }, []);

  const Submit = async e => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData.token;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
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
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Changes saved"
        });
        localStorage.setItem("profileName", JSON.stringify(data.name));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  function handleUploadAvatar(e) {
    setprofileAvatar(e.target.files[0]);
    setMyAvatar(URL.createObjectURL(e.target.files[0]));
    uploadAvatar(e.target.files[0]);
  }

  async function uploadAvatar(image) {
    if (image) {
      let formData = new FormData();
      formData.append("avatar", image);
      setMyAvatar(URL.createObjectURL(image));
      const response = await fetch(
        `${baseURL}/profile/avatar`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "POST",
          body: formData
        }
      );
      const data = await response.json();
      setMyAvatar(data.data.avatar);
    }
  }

  return (
    <div className="modal-page">
      <div className="modal">
        <div className="user-modal">
          <div className="user-avatar2">
            <img
              src={myAvatar || Avatar}
              className="avatar-modal"
              alt="profile-pic"
            />
          </div>
          <form className="form-details">
            <div className="uploadphoto">
              <label htmlFor="file" className="label-avatar">
                <span
                  style={{
                    background: "transparent",
                    padding: "10px 10px",
                    borderRadius: "5px",
                    color: "#19a68e",
                    cursor: "pointer",
                    border: "2px solid #19a68e"
                  }}
                >
                  Upload Photo
                </span>
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                alt="pp"
                accept=".jpg, .png, .jpeg"
                className="avatar2"
                onChange={handleUploadAvatar}
              ></input>
              {/* <div onClick={uploadAvatar} className="imgbtn" >save image</div> */}
            </div>
          </form>

          {/* <div className="btn-wrapper">
        <button onClick={handleLogout} style={loading ? {background: '#f84343', cursor: 'not-allowed'} : {background: 'transparent', cursor: 'pointer'}}>{loading ? <Loader /> : <span>Log Out</span>}</button>
        <button onClick={handleDelete} style={isLoadingDelete ? {background: '#f84343', cursor: 'not-allowed'} : {background: 'transparent', cursor: 'pointer'}}>{isLoadingDelete ? <Loader /> : <span>Delete Account</span>}</button>
      </div> */}
        </div>
        <div className="form">
          <form onSubmit={e => Submit(e)}>
            <Inputfield
              className="form-group"
              label={"Name"}
              callback={handleOnchange}
              id="name"
              type="text"
              placeholder="Name"
              value={data.name}
            />
            <Inputfield
              className="form-group"
              label={"Jobs"}
              callback={handleOnchange}
              id="job"
              type="text"
              placeholder="Job"
              value={data.job}
            />

            <Inputfield
              className="form-group"
              label={"Location"}
              callback={handleOnchange}
              id="location"
              type="text"
              placeholder="Location"
              value={data.location}
            />

            <Inputfield
              className="form-group email"
              style={{ color: "#6C6C70" }}
              label={"Email"}
              id="email"
              type="email"
              placeholder="E-mail"
              value={data.email}
            />

            <Inputfield
              className="form-group"
              label={"Phone Number"}
              callback={handleOnchange}
              id="phoneNumber"
              type="tel"
              placeholder="Phone number"
              value={data.phoneNumber}
            />
            <div className="save-btn">
              <div id="postbtnid" className="form-btn-wrapper">
                <button className="submit-btn button_profile" onSubmit={Submit}>
                  Save Changes
                </button>
              </div>
              <div className="cancel" onClick={onClose}>
                Cancel
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modalpro;
