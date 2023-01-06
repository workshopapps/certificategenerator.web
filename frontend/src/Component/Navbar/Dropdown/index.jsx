import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./dropdown.style.scss";
import { Toast } from "../../ToastAlert";
import Logout from "../assets/logout.svg";
import { baseURL } from "../../../api/axios";
import Profile from "../assets/profile-circle.svg";
import CaretUp from "../../../assets/svgs/caret-up.svg";
import DashboardIcon from "../assets/dashboard-icon.svg";
import CaretDown from "../../../assets/svgs/caret-down.svg";
import Avatar from "../../../assets/svgs/default-brandkit.svg";

function DropDown() {
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const [profilePic, setProfilePic] = useState(null);
  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  window.addEventListener("click", () => {
    setIsOpen(false);
  });
  // Handle user Logout
  const handleLogout = async e => {
    e.preventDefault();
    await axiosPrivate
      .delete("auth/logout")
      .then(res => {
        //navigate back to login
        navigate("/login");
        localStorage.clear();
      })
      .catch(err => {
        Toast.fire({
          icon: "error",
          title: "Error logging out"
        });
      });
  };
  useEffect(() => {
    const getImage = async () => {
      const res = await axiosPrivate.get("/profile/avatar");
      setProfilePic(res.data.data.avatar);
    };
    getImage();
  }, []);

  return (
    <div>
      <div className="dropdown-container" onClick={e => e.stopPropagation()}>
        <div className="dropdown__items" onClick={() => setIsOpen(!isOpen)}>
          <h3>My Account</h3>
          <div></div>
        </div>
        <div className="caret" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <img src={CaretUp} alt="caret-down" id="caret-down" />
          ) : (
            <img src={CaretDown} alt="caret-down" id="caret-down" />
          )}
        </div>
        <Link to="/profile">
          <span className="dropdown__img">
            <img src={profilePic || Avatar} alt="avatar" />
          </span>
        </Link>
      </div>
      {isOpen && (
        <div className="drop" onClick={() => setIsOpen(false)}>
          <Link to="/dashboard" className="drop__item">
            <span>
              <img src={DashboardIcon} alt="logout-icon" />
            </span>
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" className="drop__item">
            <span>
              <img src={Profile} alt="logout-icon" />
            </span>
            <span>View Profile</span>{" "}
          </Link>
          <span className="drop__item" onClick={handleLogout}>
            <span>
              <img src={Logout} alt="logout-icon" />
            </span>
            <span id="logout">Log out</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default DropDown;
