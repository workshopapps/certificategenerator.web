import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "./uploadcsv.style.scss";
import { CSVLink } from "react-csv";
import { baseURL } from "../../../api/axios";
import Button from "../../../Component/button";
import { ButtonLoader } from "../../../Component";
import AppContext from "../../../contexts/AppProvider";
import CSVSample from "../../../assets/images/CSV-sample.png";
import UploadVector from "../../../assets/images/uploadPage/uploadVector.svg";

const UploadCsv = ({ getUserCertificates, onClose }) => {
  const { array, setArray } = useContext(AppContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;

  const axiosFormData = axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  });

  const onFileChange = e => {
    if (e.target && e.target.files[0]) {
      setFile(e.target.files[0])
    }
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
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosFormData.post("/certificates", {file: file});
      setLoading(false);
      setArray(res.data.data.certificateData);
      localStorage.setItem(
        "dataKey",
        JSON.stringify(res.data.data.certificateData)
      );
      navigate("/bulk_preview");
      onClose();
      getUserCertificates();
      Toast.fire({
        icon: "success",
        title: "Successfully Updated"
      });
    } catch (error) {
      onClose();
      setLoading(false);
      if (error.response.status === 400 || error.response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Failed Request"
        });
      } else if (error.response.status === 500) {
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      }
    }
  };

  return (
    <article id="uploadCSVContainer">
      <Button
        className="Submitcsv"
        style={{ margin: "1em auto", width: "200px" }}
      >
        <CSVLink
          data={csvDataSample}
          headers={headers}
          filename="sample.csv"
          style={{ color: "white" }}
        >
          Download sample
        </CSVLink>
      </Button>
      <h6 style={{ textAlign: "center" }}>
        Upload your CSV file here in the format below
      </h6>
      <div>
        <div style={{ marginBottom: "16px" }}>
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
          <div>
            <span>{file.name}</span>
          </div>
        </div>
      </div>
      <section>
        <img src={CSVSample} alt="cert" />
      </section>
      <button onClick={e => handleUpload(e)}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ButtonLoader />
          </div>
        ) : (
          "Submit CSV"
        )}
      </button>
    </article>
  );
};

export default UploadCsv;

const headers = [
  { label: "name", key: "name" },
  { label: "nameOfOrganization", key: "nameOfOrganization" },
  { label: "description", key: "description" },
  { label: "award", key: "award" },
  { label: "signed", key: "signed" },
  { label: "email", key: "email" },
  { label: "date", key: "date" }
];

const csvDataSample = [
  {
    name: "jane doe",
    nameOfOrganization: "zuri",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "john champ",
    nameOfOrganization: "zuri",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "Peter Smith row",
    nameOfOrganization: "zuri",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
];
