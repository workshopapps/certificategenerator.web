import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import "./edit.style.scss";
import Swal from "sweetalert2";

const EditModal = ({ open, onClose, getUserCertificates, editData }) => {
  const [name, setName] = useState("");
  const [nameOfOrganization, setNameOfOrg] = useState("");
  const [award, setAward] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [signed, setSigned] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = "https://certgo.hng.tech/api";
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;


  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  // const nameRef = useRef()
  const formData = {
    name,
    nameOfOrganization,
    description,
    signed,
    email,
    award,
    date
  }
  const data = JSON.stringify(formData)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosPrivate.put(`/certificates/${editData._id}`, data);
      console.log(res);
      if (res.status === 403) {
        setLoading(false);
        console.log("load");
        Toast.fire({
          icon: "error",
          title: "Bad Request"
        });
      } else if (res.status === 500) {
        setLoading(false);
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      } else {
        setLoading(false);
        onClose();
        getUserCertificates();
        Toast.fire({
          icon: "success",
          title: "Successfully Updated"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  if (!open) return null;

  return (
    <div onClick={onClose} className="edit-modal-wrapper">
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-container__header">
          <h3>Edit Certificate</h3>
          <CloseIcon className="modal-container__cancel" onClick={onClose} />
        </div>
        <div className="modal-container__body">
          <form onSubmit={handleSubmit}>
            {console.log(name)}
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-input"
                defaultValue={editData.name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Name of Organization</label>
              <input
                type="text"
                className="form-input"
                defaultValue={editData.nameoforganization}
                onChange={e => setNameOfOrg(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Award</label>
              <input
                type="text"
                className="form-input"
                defaultValue={editData.award}
                onChange={e => setNameOfOrg(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Description</label>
              <input
                type="text"
                className="form-input"
                defaultValue={editData.description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Date</label>
              <input
                type="date"
                className="form-input"
                defaultValue={editData.date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">issued by</label>
              <input
                type="text"
                className="form-input"
                defaultValue={editData.signed}
                onChange={e => setSigned(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="form-input"
                defaultValue={editData.email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-btn">
              <button id="btn-save">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
