import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/icon.png";
import "./footer.style.scss";
import { BsInstagram, BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(email)) {
      setEmail("");
      setMessage("");
    } else if (!regex.test(email) && email !== "") {
      setMessage("Please enter a valid email");
    } else {
      return;
    }
  };
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-lists">
            <div className="list">
              <h2>company</h2>
              <Link className="link">About</Link>
              <Link className="link">Contact</Link>
              <Link className="link">Our team</Link>
            </div>
            <div className="list">
              <h2>product</h2>
              <Link className="link">How it works</Link>
              <Link className="link">Pricing</Link>
              <Link className="link">Terms of Service</Link>
              <Link className="link">Privacy Policy</Link>
            </div>
            <div className="list">
              <h2>resources</h2>
              <Link className="link">Blog</Link>
              <Link className="link">Help</Link>
              <Link className="link">FAQs</Link>
            </div>
          </div>
          <div className="footer-form">
            <h3>Stay up to date with Product</h3>
            <form noValidate>
              <p className="error-msg">{message}</p>
              <div className="footer-input">
                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  value={email}
                  name="name"
                  onClick={() => setMessage("")}
                />
                <button onClick={handleSubmit}>Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-info">
          <div className="footer-logo">
            <h2>
              Certawi <img src={logo} alt="certawi logo" />
            </h2>
            <h3>info@certawi.com</h3>
          </div>
          <div className="footer-socials">
            <h3>We are social</h3>
            <div>
              <BsInstagram className="social" />
              <BsLinkedin className="social" />
              <BsTwitter className="social" />
              <BsGithub className="social" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright footer-container">
        <h3>
          &copy; Copyright {year}{" "}
          <span className="headlight-text">Team Headlight</span>. All rights
          reserved.
        </h3>
      </div>
    </div>
  );
};

export default Footer;
