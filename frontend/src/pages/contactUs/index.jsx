import React from "react";
import {
  ContactChatIcon,
  ContactLocationIcon,
  ContactPhoneIcon,
} from "../../assets";
import Button from "../../Component/button";
import Inputfield from "../../Component/inputField";
import TextArea from "../../Component/textarea";
import "./contact.scss";

const ContactUs = () => {
  return (
    <div className="contact">
      <div className="contact__content">
        {/* Contact Info */}

        <div className="contact__info">
          <div className="contact__info--item">
            <ContactChatIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">Chat with customer suport</h4>
              <p className="contact__info--address">Chat with sales team</p>
              <span>support@certonic.com</span>
            </div>
          </div>
          <div className="contact__info--item">
            <ContactLocationIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">Visit us</h4>
              <p className="contact__info--address">Visit our office</p>
              <span>121 vincent str., lagos</span>
            </div>
          </div>
          <div className="contact__info--item">
            <ContactPhoneIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">Call us</h4>
              <p className="contact__info--address">Mon-Fri from 8am-6pm</p>
              <span>+234900-000-000</span>
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
          <form action="">
            <div className="contact__form--group">
              <Inputfield
                placeholder="First name"
                label="First Name"
                type="text"
              />
              <Inputfield
                placeholder="First name"
                label="Last Name"
                type="text"
              />
            </div>
            <Inputfield
              label=" Email"
              type="email"
              placeholder="gigtot@gmail.com"
            />
            <Inputfield
              label=" Phone no"
              placeholder="+234900000 "
              type="tel"
            />
            <TextArea placeholder="type message here" label="Message" />
            <Button width='100%'>Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
