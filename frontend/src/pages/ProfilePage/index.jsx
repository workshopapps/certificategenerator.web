import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./profile.style.scss";
import Modalpro from "./EditModal";
import DeleteModal from "./DeleteModal";
import { baseURL } from "../../api/axios";
import axiosPrivate from "../../api/axios";
import Button from "../../Component/button";
import Avatar from "./assets/default-avatar.svg";
import Loader from "../../Component/ButtonLoader";
import { Toast } from "../../Component/ToastAlert";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [myAvatar, setMyAvatar] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    job: "",
    location: "",
    phoneNumber: "",
    email: ""
  });
  window.addEventListener("click", () => {
    setOpenDeleteModal(false);
  });
  const handleLogout = async e => {
    setLoading(true);
    e.preventDefault();
    await axiosPrivate
      .delete("auth/logout")
      .then(res => {
        //navigate back to login
        navigate("/login");
        setLoading(false);
        localStorage.clear();
      })
      .catch(err => {
        Toast.fire({
          icon: "error",
          title: "Error logging out"
        });
        setLoading(false);
      });
  };

  const url = `${baseURL}/profile`;

  const userToken = JSON.parse(localStorage.getItem("userData")).token;
  const headers = {
    Authorization: `Bearer ${userToken}`,
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

  return (
    <div className="parent">
      {openModal && <Modalpro onClose={() => setOpenModal(false)} />}
      {openDeleteModal && (
        <DeleteModal onClose={() => setOpenDeleteModal(false)} />
      )}
      <div className="profile-page">
        <div className="user-info">
          <div className="user-avatar">
            <img src={myAvatar || Avatar} alt="profile-pic" />
          </div>
          <div className="edit" onClick={() => setOpenModal(!openModal)}>
            Edit
          </div>

          <div className="profileFormCont">
            <form className="data-avatar">
              <div className="avatar-text">
                <span>NAME:</span>
                <span className="profileData name">
                  {data.name || " Input your name"}
                </span>
              </div>
              <div className="line"></div>
              <div className="avatar-text1">
                <span>JOB:</span>
                <span className="profileData">
                  {data.job || " Input your job "}
                </span>
              </div>
              <div className="line"></div>
              <div className="avatar-text2">
                <span>LOCATION:</span>{" "}
                <span className="profileData">
                  {data.location || "Input your location "}
                </span>
              </div>
              <div className="line"></div>
              <div className="avatar-text3">
                <span>EMAIL:</span>{" "}
                <span className="profileData email">
                  {data.email || "Input your email"}
                </span>
              </div>
              <div className="line"></div>
              <div className="avatar-text4">
                <span className="phone">PHONE NUMBER:</span>{" "}
                <span className="profileData">
                  {data.phoneNumber || "Input your number"}
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="actionButtons" onClick={e => e.stopPropagation()}>
          <Button
            style={{
              background: "#F84343",
              color: "#FFFFFF",
              border: "1px solid red"
            }}
            onClick={handleLogout}
          >
            {loading ? <Loader /> : <span>Log out</span>}
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "#F84343",
              border: "1px solid #F84343"
            }}
            onClick={() => setOpenDeleteModal(!openModal)}
          >
            {<span>Delete account</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
