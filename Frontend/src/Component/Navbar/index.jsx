import "./navbar.style.scss";
//import menu from '../../pages/ComingSoon/images/menu.svg'
import React, { useRef, useState } from "react";
import logo from "../../assets/images/navbarIcon.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [switchFa, setSwitchFa] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef();
  const handleToggle = () => {
    navRef.current.classList.toggle("show-links");
    setSwitchFa(!switchFa);
  };

  const links = [
    {
      id: 1,
      url: "/",
      text: "home",
    },
    {
      id: 2,
      url: "/templates",
      text: "browse templates",
    },
    {
      id: 3,
      url: "/pricing",
      text: "pricing",
    },
    {
      id: 4,
      url: "/contact-us",
      text: "contact",
    },
    {
      id: 5,
      url: "/FAQ",
      text: "FAQs",
    },
  ];

  return (
    <div id="Nav">
      <div className="navbar">
        <div className="nav-header-container">
          <div className="nav-header nav-container">
            <div className="nav-logo" onClick={() => navigate("/")}>
              <h2>
                Cert<span>onic</span>
              </h2>
              <img src={logo} alt="Certonic bulb" />
            </div>
            <div className="nav-click">
              <button className="btn">
                <Link to="/modify" className="link">
                  get started
                </Link>
              </button>
              {switchFa === true ? (
                <FaTimes className="times" onClick={handleToggle} />
              ) : (
                <FaBars className="bars" onClick={handleToggle} />
              )}
            </div>
          </div>
        </div>
        <div className="nav-links">
          <div className="links-container nav-container" ref={navRef}>
            <div className="links">
              {links.map((link) => {
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
              <button className="btn" onClick={handleToggle}>
                <Link to="/modify" className="link">
                  get started
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
