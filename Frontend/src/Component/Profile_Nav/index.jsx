import "./navbar.style.scss";
import logo from "./assests/Certawi.png";
import bulb from "./assests/bulb.png";
import menu from "./assests/menu.png";
import image from "./assests/image.png";
import React from "react";
import { useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const setShowHandler = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <React.Fragment>
      <div className="nav">
        <div className="holding_div">
          <div className="logos">
            <img src={logo} />
            <img src={bulb} />
          </div>
          <div className="list_menu_items_holder">
            <a className="list_menu_item first">Home</a>
            <a className="list_menu_item others">Browse Templates</a>
            <a className="list_menu_item others">Pricing</a>
            <a className="list_menu_item others">Blog</a>
            <a className="list_menu_item others">FAQs</a>
            <a className="list_menu_item flex last">
              <span>My Account</span> <img src={image} />
            </a>
          </div>
          <button type="button" onClick={setShowHandler} id="hamburger">
            <img src={menu} />
          </button>
        </div>
        {show && (
          <div className="menu_holder">
            <div className="menu_items">
              <span className="item">Home</span>
              <span className="item">Browse Templates</span>
              <span className="item">Pricing</span>
              <span className="item">Blog</span>
              <span className="item">FAQs</span>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Navbar;
