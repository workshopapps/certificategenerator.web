import axios from "axios";
import Papa from "papaparse";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import "./uploadCSV.style.scss";
// component
import {ButtonLoader} from "../../Component";
import Button from "../../Component/button";
import AppContext from "../../contexts/AppProvider";
// img
import CSVSample from "../../assets/images/CSV-sample.png";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";

const headers = [
  {label: "name", key: "name"},
  {label: "nameOfOrganization", key: "nameOfOrganization"},
  {label: "description", key: "description"},
  {label: "award", key: "award"},
  {label: "signed", key: "signed"},
  {label: "email", key: "email"},
  {label: "date", key: "date"}
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

const UploadCSV = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const { array, setArray } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  
  // Function to handle file change
  const validateInput = e => {
    setErrorFile(false);
    const myFile = e.target.files[0];
    if (myFile.type !== "text/csv") {
      setErrorFile(true);
    }

    // Passing csv file data to parse using Papa.parse
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setArray(results.data);
      },
    });
    setFile(myFile);
  };
  
  // Data stored in the local storage
  useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(array));
    localStorage.setItem('unauthData', JSON.stringify(array));
  }, [array]);


  let formData = new FormData();

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

  // Function to send uploaded file to the backend
  const handleUpload = async e => {
    e.preventDefault();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://certgo.hng.tech/api/upload/csv",
        formData
      );
      if (res.status === 200) {
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "Successfully uploaded"
        });
        navigate("/bulk_preview");
      } else if (res.status === 502) {
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "502 Bad Gateway"
        });
      } else if (res.status === 400) {
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "Missing file"
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        // title: error.message
        title: "Upload failed due to invalid field(s)"
      });
    }
  };

  return (
    <div className="uploadCSVContainer">
      <div className="certificateSwitch"></div>
      <h2>Upload your csv file in the format below</h2>
      <div className="CSVSample">
        <img src={CSVSample} alt="CSV sample" />
      </div>
      {/* Button to download sample CSV */}
      <Button className="Submitcsv" style={{ margin: "1em auto", width: "200px" }}>
        <CSVLink data={csvDataSample} headers={headers} filename="sample.csv" style={{ color: "white" }}>
          Download sample
        </CSVLink>
      </Button>
      <div className="dragBox">
        <div className="dragboxContainer">
          <i>
            <img src={UploadVector} alt="upload icon" />
          </i>
          <span>
            Drag and drop your CSV file here
            <br /> or <br />
            <label htmlFor="uploadCSV" className="fileUpload CSVupload">
              <input
                type="file"
                id="uploadCSV"
                name="uploadCSV"
                accept=".csv"
                className="box"
                onChange={e => validateInput(e)}
              />
            </label>
          </span>
        </div>
        {errorFile && (
          <div className="messagecsv">Invalid file!! submit only csv files</div>
        )}
        <Button
          className="Submitcsv"
          style={{ margin: "1em auto" }}
          onClick={e => handleUpload(e)}
        >
          {loading ? <ButtonLoader /> : "Submit CSV"}
        </Button>
      </div>
    </div>
  );
};

export default UploadCSV;
