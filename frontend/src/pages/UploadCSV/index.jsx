import axios from "axios";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./uploadCSV.style.scss";
import SampleCsv from "./sample.csv";
// component
import Loader from "../Dashboard/Loader";
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
  {
    name: "malaang sar konga",
    nameOfOrganization: "zuri",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "tuchel geraldine",
    nameOfOrganization: "zuri",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "cecy cardine",
    nameOfOrganization: "hng",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "get away",
    nameOfOrganization: "hng",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "Lionel Messi sn.",
    nameOfOrganization: "hng",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  },
  {
    name: "team headlight",
    nameOfOrganization: "zuri",
    description:
      "this certificate is a proof of completion for HNG internship program",
    award: "certificate of completion",
    signed: "###",
    email: "josepholukunle1107@gmail.com",
    date: "13-02-2022"
  }
];

const UploadCSV = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const { array, setArray } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorFile, setErrorFile] = useState(false);

  const fileReader = new FileReader();

  // Function to set certificate data
  const certificateData = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    console.log("csv", csvRows);
    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
  };

  console.log("File", array);

  const validateInput = e => {
    setErrorFile(false);
    const myFile = e.target.files[0];
    if (myFile.type !== "text/csv") {
      setErrorFile(true);
    }
    setFile(myFile);
  };

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
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        certificateData(text);
      };
      fileReader.readAsText(file);
    }
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://certgo.hng.tech/api/upload/csv",
        formData
      );
      if (res.status === 200) {
        console.log("Response", res);
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "Successfully uploaded"
        });
        navigate("/bulk_preview");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
      Toast.fire({
        icon: "error",
        title: "Upload failed"
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
          {loading ? <Loader /> : "Submit CSV"}
        </Button>
      </div>
    </div>
  );
};

export default UploadCSV;
