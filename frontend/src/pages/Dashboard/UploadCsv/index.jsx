import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import CSVSample from "../../../assets/images/CSV-sample.png";
import { CSVLink } from "react-csv";
import UploadVector from "../../../assets/images/uploadPage/uploadVector.svg";
import useAppProvider from "../../../hooks/useAppProvider";
import { axiosFormData } from "../../../api/axios";
import { ButtonLoader } from "../../../Component";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../contexts/AppProvider";
import "./uploadcsv.style.scss";
import Button from "../../../Component/button";

const UploadCsv = ({ getUserCertificates, onClose }) => {
  const { array, setArray } = useContext(AppContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const baseURL = "https://certgo.hng.tech/api";

  const axiosFormData = axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  });

  // let formData = new FormData();

  const onFileChange = e => {
    if (e.target && e.target.files[0]) {
      // formData.append("file", e.target.files[0]);
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
    console.log("i got here");
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosFormData.post("/certificates", {file: file});
      console.log(res);

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
