import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/footerIcon.png";
import "./footer.style.scss";
import { BsInstagram, BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { useEffect } from "react";
import Button from "../button";

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(email)) {
      setEmail("");
      setMessage("");
      onSubscribe();
    } else if (!regex.test(email) && email !== "") {
      setMessage("Please enter a valid email");
    } else {
      return;
    }
  };

  function onSubscribe() {
    setMessage("");
    let data = { email: email };
    fetch("https://certify-api.onrender.com/api/mailinglists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log("Request complete! response:", res);
      })
      .catch(err => {
        console.log("error", ":", err);
      });
  }

  function formSubscriptionHandler(e) {
    e.preventDefault();
    onSubscribe();
  }

  const routePath = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routePath]);

  return (
    <div id="footerId" className="footer">
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-lists">
            <div className="list">
              <h2>company</h2>
              <Link to="/aboutUs" className="link">
                About us
              </Link>
              <Link to="/contact-us" className="link">
                Contact
              </Link>
              <Link to="/team" className="link">
                Our team
              </Link>
            </div>
            <div className="list">
              <h2>product</h2>
              <Link to="/pricing" className="link">
                Pricing
              </Link>
              <Link to="/terms" className="link">
                Terms of Service
              </Link>
              <Link to="/privacy" className="link">
                Privacy Policy
              </Link>
            </div>
            <div className="list">
              <h2>resources</h2>
              <Link to="/templates" className="link">
                Templates
              </Link>
              <Link to="/career" className="link">
                Career
              </Link>
              <Link to="/FAQ" className="link">
                FAQs
              </Link>
            </div>
          </div>
          <div className="footer-form">
            <h3>Stay up to date with Product</h3>
            <form onSubmit={formSubscriptionHandler}>
              <div className="footer-input">
                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  value={email}
                  name="name"
                  onClick={onSubscribe}
                />
                <Button onClick={handleSubmit}>Subscribe</Button>
              </div>
              <p className="error-msg">{message}</p>
            </form>
          </div>
        </div>
        <div className="footer-info">
          <div className="footer-logo">
            <h2>
              Certgo <img src={logo} alt="Certgo logo" />
            </h2>
            <h3>info@certgo.com</h3>
          </div>
          <div className="footer-socials">
            <h3>We are social</h3>
            <div>
              <a
                href="https://instagram.com/hnginternship?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram className="social" />
              </a>
              <a
                href="https://www.linkedin.com/m/company/hng-internship"
                target="_blank"
                rel="noreferrer"
              >
                <BsLinkedin className="social" />
              </a>
              <a
                href="https://twitter.com/hnginternship?s=21&t=xpk379-T4b-GQ5_UAcEnsg"
                target="_blank"
                rel="noreferrer"
              >
                <BsTwitter className="social" />
              </a>
              <a
                href="https://github.com/workshopapps/certificategenerator.web"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub className="social" />
              </a>
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
