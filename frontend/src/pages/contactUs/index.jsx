import React, { useState, useEffect } from "react";
import {
  ContactChatIcon,
  ContactLocationIcon,
  ContactPhoneIcon
} from "../../assets";
import Button from "../../Component/button";
import Inputfield from "../../Component/inputField";
import TextArea from "../../Component/textarea";
import "./contact.scss";
import axios from "../../api/axios";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/contactus", {
        firstName,
        lastName,
        email,
        phoneNumber,
        message
      });
       setFirstName("");
       setLastName("");
       setEmail("");
       setPhoneNumber("");
       setMessage("");
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  }, [success]);

  return (
    <div className="contact">
      <div className="contact__content">
        {/* Contact Info */}

        <div className="contact__info">
          <div className="contact__info--item">
            <ContactChatIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">Chat with customer suport</h4>
              <span>Chat with sales team</span>
              <p className="contact__info--address">support@certawi.com</p>
            </div>
          </div>
          <div className="contact__info--item">
            <ContactLocationIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">Visit us</h4>
              <span>Visit our office</span>
              <p className="contact__info--address">121 vincent str., lagos</p>
            </div>
          </div>
          <div className="contact__info--item">
            <ContactPhoneIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">Call us</h4>
              <span>Mon-Fri from 8am-6pm</span>
              <p className="contact__info--address">+234900-000-000</p>
            </div>
          </div>
        </div>

        <div className="contact__form">
          <div className="contact__form-intro">
            <h2 className="contact__form--title">Contact Us</h2>
            <p className="contact__form--subtitle">
              Our friendly team would love to hear from you
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="contact__form--group">
              <Inputfield
                placeholder="First name"
                label="First Name"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <Inputfield
                placeholder="First name"
                label="Last Name"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
            <Inputfield
              label=" Email"
              type="email"
              placeholder="gigtot@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Inputfield
              label=" Phone no"
              placeholder="+234900000 "
              type="number"
              value={phoneNumber}
              maxlength='13'
              pattern='[0-9]*'
              onChange={e => setPhoneNumber(e.target.value)}
              required
            />
            <TextArea
              placeholder="type message here"
              label="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
            <Button width="100%" >
              {loading ? (
                <div className="loading"></div>
              ) : success ? (
                "Message sent!"
              ) : (
                "Send Message"
              )}
            </Button>
            {error && <p>Something went wrong</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
