import React, { useState } from "react";
import "./userForm.style.scss";
const UserForm = () => {
  const [name, setName] = useState("Olamipos Benjamin");
  const [job, setJob] = useState("Advisor and consultant at Stripe");
  const [location, setLocation] = useState("Lagos");
  const [mail, setMail] = useState("ateytwray@gmail.com");
  const [number, setNumber] = useState("(316) 555-0116");

  const nameChangeHandler = (evevnt) => {
    setName(evevnt.target.value);
  };
  const jobChangeHandler = (evevnt) => {
    setJob(evevnt.target.value);
  };
  const locationChangeHandler = (evevnt) => {
    setLocation(evevnt.target.value);
  };
  const mailChangeHandler = (evevnt) => {
    setMail(evevnt.target.value);
  };
  const numberChangeHandler = (evevnt) => {
    setNumber(evevnt.target.value);
  };

  return (
    <div className="user_form">
      <div className="link_items">
        <div className="myFlex border-bottom">
          <a>Individual</a>
        </div>
        <div className="myFlex">
          <a>Bulk</a>
        </div>
      </div>
      <form>
        <h4>Manage Your Profile</h4>
        <div className="form_item">
          <input
            id="name"
            type="text"
            value={name}
            onChange={nameChangeHandler}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form_item">
          <input id="job" type="text" value={job} onChange={jobChangeHandler} />
          <label htmlFor="job">Job</label>
        </div>
        <div className="form_item">
          <input
            id="location"
            type="text"
            value={location}
            onChange={locationChangeHandler}
          />
          <label htmlFor="location">Location</label>
        </div>
        <div className="form_item">
          <input
            id="mail"
            type="email"
            value={mail}
            onChange={mailChangeHandler}
          />
          <label htmlFor="mail">Email</label>
        </div>
        <div className="form_item">
          <input
            id="phone"
            type="text"
            value={number}
            onChange={numberChangeHandler}
          />
          <label htmlFor="phone">Phone Number</label>
        </div>
        <div className="flex_center">
          <button type="button" className="btn">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
