import React from "react";
import "./deletemodal.style.scss";
import axiosPrivate from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Button from "../../../Component/button";

export default function DeleteModal({ onClose }) {
  const navigate = useNavigate();
  function handleDelete() {
    const url = "https://api.certgo.app/api/profile";
    const userToken = JSON.parse(localStorage.getItem("userData")).token;
    const headers = {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json"
    };
    fetch(url, {
      method: "DELETE",
      headers
    })
      .then(res => res.json())
      .then(res => {
        //setData(res.data.profile)
        console.log(res.data);
        console.log("Account deleted");
        navigate("/signup");
        localStorage.clear();
      })
      .catch(err => console.log(console.error()));
  }

  return (
    <div className="deletemodal">
      <div
        className="deletemodal__container"
        onClick={e => e.stopPropagation()}
      >
        <h4>Are you sure you want to delete your account?</h4>
        <div className="delete-actions">
          <Button
            style={{
              background: "#F84343",
              color: "#FFFFFF",
              border: "1px solid #F84343",
              width: "76px"
            }}
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "#F84343",
              border: "1px solid #F84343",
              width: "76px"
            }}
            onClick={onClose}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
