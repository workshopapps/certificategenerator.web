import axios from "axios";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./uploadCSV.style.scss";
// component
import Loader from "../Dashboard/Loader";
import Button from "../../Component/button";
import AppContext from "../../contexts/AppProvider";
// img
import CSVSample from "../../assets/images/CSV-sample.png";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";

const UploadCSV = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const { setArray } = useContext(AppContext);
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
