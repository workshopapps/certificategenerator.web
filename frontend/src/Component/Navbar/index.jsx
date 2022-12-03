import "./navbar.style.scss";
//import menu from '../../pages/ComingSoon/images/menu.svg'
import React, {  useState } from "react";
import logo from "../../assets/images/navbarIcon.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../button";

function Navbar() {
  const [switchFa, setSwitchFa] = useState(false);
  const navigate = useNavigate();

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
    <div id="Nav">
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
              <Button className="btn" name={"get started"}>
                <Link to="/modify" className="link"></Link>
              </Button>

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
            <div className="button-container">
              <Button
                className="btn"
                onClick={handleToggle}
                name={"get started"}
              >
                <Link to="/modify" className="link"></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
