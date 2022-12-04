import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

import "./uploadCSV.style.scss";
// component
import Button from "../../Component/button";
// img
import CSVSample from "../../assets/images/CSV-sample.png";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";
import { useNavigate } from "react-router-dom";

const UploadCSV = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [errorFile, setErrorFile] = useState(false);

  const validateInput= (e) =>{
    setErrorFile(false)
    const myFile = e.target.files[0]
    console.log(e.target,myFile)
    if (myFile.type !== 'text/csv'){
      setErrorFile(true);
    }
    setFile(myFile);
  }

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

    try {
      const res = await axios.post("https://certify-api.onrender.com/api/upload/csv", formData);
      console.log("Form data", res.data);
      if (res.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Successfully uploaded"
        });
      }
    } catch (error) {
      console.log("Error", error);
      Toast.fire({
        icon: "error",
        title: "Upload failed"
      });
    }

    navigate("/bulk_preview");
  }

  return (
    <div className="uploadCSVContainer">
      <div className="certificateSwitch">
      </div>
      <h2>Upload your csv file in the format below</h2>
      <div className="CSVSample">
        <img src={CSVSample} alt="CSV sample" />
      </div>

      <div
        className="dragBox"
      >
        <div className="dragboxContainer">
          <i>
            <img src={UploadVector} alt="upload icon" />
          </i>
          <span >
            Drag and drop your CSV file here
            <br /> or <br />
            <label htmlFor="uploadCSV" className="fileUpload CSVupload">
              <input
                type="file"
                id="uploadCSV"
                name="uploadCSV"
                accept=".csv"
                className="box"
                onChange={e=>validateInput(e)}
              />
            </label>
          </span> 
        </div> 
        {errorFile && <div className="messagecsv">Invalid file!! submit only csv files</div>}
        <Button className="btn btnLight" style={{ margin: "1em auto" }} onClick={handleUpload}>
          Submit CSV
        </Button>        
      </div>
    </div>
  );
};

export default UploadCSV;
