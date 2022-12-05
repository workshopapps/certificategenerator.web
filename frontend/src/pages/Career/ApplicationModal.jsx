import React, { useState } from "react";
import Button from "../../Component/button";
import Inputfield from "../../Component/inputField";
import axios from "axios"

const ApplicationModal = ({ position, openApplyModal, setOpenApplyModal }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const role = position.role
    const jobType = position.type
    const location = position.location


    async function handleSubmit(e) {
        e.preventDefault()
        try {
           const data = await axios.post(
             "https://certgo.hng.tech/api/applycareers",
             {
               email,
               name,
               role,
               location,
               jobType
             }
           );
            console.log(data)
            setOpenApplyModal(!ApplicationModal)
        } catch (err) {
            console.log(err)
        }
        
    }
  return (
    <>
      {openApplyModal && (
        <div className="applyModal">
          <div className="applyModal__container">
            <div className="applyModal__text">
              <h4 className="job__title">Role: {position.role}</h4>
              <h5 className="job__type">Job type: {position.type}</h5>
              <span className="job__location">
                Location: {position.location}
              </span>
              {/* <p className="job__description">
                Job description: {position.desc}
              </p> */}
            </div>

            <form className="form applyModal__form" onSubmit={handleSubmit}>
              <Inputfield
                type="text"
                label="Full Name"
                onChange={e => setName(e.target.value)}
                placeholder="Full name"
              />
              <Inputfield
                type="email"
                label="Email Address"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
              />
              <Button>Apply</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationModal;
