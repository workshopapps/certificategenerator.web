import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import DropDown from './Dropdown'

import "./navbar.style.scss";
import logo from "../../assets/images/navbarIcon.png";
// import profilePic from '../../assets/images/Ellipse4.png';
import Button from "../button";

function Navbar() {
  const [switchFa, setSwitchFa] = useState(false);
  // const [istoken, setIstoken] = useState(false);
  const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("userData")
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIstoken(true);
  //   } else {
  //     setIstoken(false);
  //   }
  // }, []);

  const handleToggle = () => {
    setSwitchFa(!switchFa);
  };

  const links = [
    {
      id: 1,
      url: "/",
      text: "home"
    },
    {
      id: 2,
      url: "/pricing",
      text: "pricing"
    },
    {
      id: 3,
      url: "/contact-us",
      text: "contact"
    },
    {
      id: 4,
      url: "/FAQ",
      text: "FAQs"
    }
  ];

  return (
    <div id="nav">
      <div className="navbar">
        <div className="nav-header-container">
          <div className="nav-header nav-container">
            <div className="nav-logo" onClick={() => navigate("/")}>
              <h2>
                Cert<span>go</span>
              </h2>
              <img src={logo} alt="Certgo bulb" />
            </div>

            <div className="nav-click">
              {isLoggedIn ? (
                <div className="dropdown-tab">
                  {/* <DropDown/> */}
                </div>
              ) : (
              <Link to="/login" className="link">
                   <Button className="btn" name={"get started"} />
              </Link>
             
              ) 
              }
             

              {switchFa === true ? (
                <FaTimes className="times" onClick={handleToggle} />
              ) : (
                <FaBars className="bars" onClick={handleToggle} />
              )}
            </div>
          </div>
        </div>
        <div className="nav-links">
          <div
            className={`links-container nav-container ${
              switchFa && "show-links"
            }`}
            // ref={navRef}
          >
            <div className="links">
              {links.map(link => {
                const { id, url, text } = link;
                return (
                  <p key={id}>
                    <NavLink to={url} className="link" onClick={handleToggle}>
                      {text}
                    </NavLink>
                  </p>
                );
              })}
            </div>


        {isLoggedIn?
              <div className="dropdown-wrapper">
                    <DropDown />
              </div>
                 : 
              <div className="button-container">
              <NavLink to="/login" >
                <Button
                  className="btn"
                  onClick={handleToggle}
                  name={"get started"}
                >
                </Button>
              </NavLink>
              </div>
        }

             
       
          </div>
        </div>
        </div>
      </div>
  );
}

export default Navbar;
