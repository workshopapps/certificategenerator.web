import "./uploadCSV.style.scss";
// component
import Button from "../../Component/button";
// img
import Certificate from "../../assets/images/uploadPage/cert.svg";
import CSVSample from "../../assets/images/CSV-sample.png";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";
import Template1 from "../../assets/images/uploadPage/template1.svg";
import Template2 from "../../assets/images/uploadPage/template2.svg";
import Template3 from "../../assets/images/uploadPage/template3.svg";
import { useState } from "react";
import axios from "axios";

const UploadCSV = () => {
  const [errorFile, setErrorFile] = useState(false);
  const [file, setFile] = useState("");

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
        navigate("/bulk_preview");
      }
    } catch (error) {
      console.log("Error", error);
    }

    // navigate("/bulk_preview");
  }

  return (
    <div className="uploadCSVContainer">
      <div className="certificateSwitch">
      </div>
      
      {/* <h1>Your certificate is almost ready!</h1> */}
      {/* <div className="certificatePreview">
        <img src={Certificate} alt="certificate preview" />
      </div> */}
      <h2>Upload your csv file in the format below</h2>
      <div className="CSVSample">
        <img src={CSVSample} alt="CSV sample" />
      </div>

      <div
        className="dragBox"
        //   onDragEnter={handleDrag}
        //   onDragLeave={handleDrag}
        //   onDragOver={handleDrag}
        //   onDrop={handleDrop}
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
        <Button className="Submitcsv" style={{ margin: "1em auto" }} onClick={handleUpload}>
          Submit CSV
        </Button>        
      </div>
      {/* <button className='btn btnLight'>Generate Certificate</button> */}
      {/* <div>
        <h2>Even More Template for You</h2>
        <div className="moreTemplate">
          <img src={Template1} alt="Template1" />
          <img src={Template2} alt="Template2" />
          <img src={Template3} alt="Template3" />
        </div>
        <Button className="btn btnLight" style={{ margin: "1em auto" }}>
          Explore More Template
        </Button>
      </div> */}
    </div>
  );
};

export default UploadCSV;
