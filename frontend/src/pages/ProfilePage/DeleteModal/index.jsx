import React from "react";
import { useNavigate } from "react-router-dom";

import "./deletemodal.style.scss";
import { baseURL } from "../../../api/axios";
import Button from "../../../Component/button";

export default function DeleteModal({ onClose }) {
  const navigate = useNavigate();
  function handleDelete() {
    const url = `${baseURL}/profile`;
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
        navigate("/signup");
        localStorage.clear();
      })
      .catch(err => console.log(console.error()));
  }

  return (
    <div className="deleteconfirm">
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
    </div>
  );
}
