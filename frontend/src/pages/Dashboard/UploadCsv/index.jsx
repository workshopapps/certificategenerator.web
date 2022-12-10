import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import CSVSample from "../../../assets/images/CSV-sample.png";
import UploadVector from "../../../assets/images/uploadPage/uploadVector.svg";
import useAppProvider from "../../../hooks/useAppProvider"
import {axiosFormData} from "../../../api/axios";
import {ButtonLoader} from "../../../Component"
import { useNavigate } from "react-router-dom";

import AppContext from "../../../contexts/AppProvider";
import "./uploadcsv.style.scss";

const UploadCsv = ({getUserCertificates, onClose}) => {
  const { array, setArray } = useContext(AppContext);
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const baseURL = "https://certgo.hng.tech/api";
  const accessToken = JSON.parse(localStorage.getItem("userData")).token
  console.log(accessToken);

  const axiosFormData = axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  });


  let formData = new FormData();

  const onFileChange = e => {
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
    console.log(e.target.files[0]);
  };

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
  const handleUpload = async e => {
    console.log('i got here')
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axiosFormData.post('/certificates', formData);
      console.log(res);
      if (res.status === 401) {
        setLoading(false);
        console.log('load');
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
        setArray(res.data.data.certificateData)
        navigate('/bulk_preview')
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

  useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(array));
  }, [array]);
  return (
    <article id="uploadCSVContainer">
      <h6>Upload your CSV file here in the format below</h6>
      <div>
        <div>
          <img src={UploadVector} alt="upload" />
        </div>
        <p>Drag and drop your CSV file here</p>
        <div>
          <span>or</span>
          <input
            type="file"
            id="files"
            className="file-upload"
            onChange={onFileChange}
          />
          <label htmlFor="files">Browse File</label>
        </div>
      </div>
      <section>
        <img src={CSVSample} alt="cert" />
      </section>
      <button onClick={(e) => handleUpload(e)}>{loading ? <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ButtonLoader />
      </div> : "Submit CSV"}</button>
    </article>
  );
};

export default UploadCsv;