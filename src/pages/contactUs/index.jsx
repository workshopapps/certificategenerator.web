import React from "react";
import { ContactChatIcon, ContactLocationIcon, ContactPhoneIcon } from "../../assets";
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
              <h4 className="contact__info--key">chat with customer suport</h4>
              <p className="contact__info--address">chat with sales team</p>
              <span>support@certawi.com</span>
            </div>
          </div>
          <div className="contact__info--item">
            <ContactLocationIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">visit us</h4>
              <p className="contact__info--address">visit our office</p>
              <span>121 vincent str., lagos</span>
            </div>
          </div>
          <div className="contact__info--item">
            <ContactPhoneIcon />
            <div className="contact__info--itemText">
              <h4 className="contact__info--key">call us</h4>
              <p className="contact__info--address">mon-Fri from 8am-6pm</p>
              <span>+234900-000-000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
