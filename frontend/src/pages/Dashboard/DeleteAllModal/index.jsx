import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./deletemodal.style.scss";
import {ButtonLoader} from "../../../Component"
import Button from "../../../Component/button";


function DeleteAllModal({
  open,
  onClose,
  action,
  logo,
  setLogo,
  certificateTitle,
  setCertificateTitle,
  awardeeName,
  setAwardeeName,
  message,
  setMessage,
  issuedBy,
  setIssuedBy,
  issueDate,
  setIssueDate,
  getUserCertificates
}) {
  const [tab, setTab] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const disabledButton =
    !logo.trim() ||
    !message.trim() ||
    !certificateTitle.trim() ||
    !awardeeName.trim() ||
    !issuedBy.trim() ||
    !issueDate.trim();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/preview");
    }, 1500);
    
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="modal-wrap">
      <div className="modal_container" onClick={e => e.stopPropagation()}>
        <div className="cancel-btn-wrapper">
          <button onClick={onClose} className="modal-container__cancel">
            <span className="cancel-x-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="modal_body">
          <div className="head">
            <p>
              Do you want to delete all your certificates?
            </p>
          </div>
          {/* <br />
          <br /> */}

          <div className="modal_options">
            <Button
              style={{
                fontSize: "16px",
                backgroundColor: "white",
                color: "#19a68e",
                padding: "1rem",
                width: "50%",
                margin: "0"
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              style={{
                fontSize: "16px",
                padding: "1rem",
                width: "50%",
                margin: "0"
              }}
              onClick={action}
            >Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAllModal;
