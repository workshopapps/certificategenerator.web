import "./uploadCSV.style.scss";
// component
import Button from "../../Component/button";
// img
import Certificate from "../../assets/images/uploadPage/cert.svg";
//import CSVSample from "../../assets/images/uploadPage/CSVSample.svg";
import CSVSample from "../../assets/images/CSV-sample.png";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";
import Template1 from "../../assets/images/uploadPage/template1.svg";
import Template2 from "../../assets/images/uploadPage/template2.svg";
import Template3 from "../../assets/images/uploadPage/template3.svg";
import { useState, useRef} from "react";

const UploadCSV = ({ setFile }) => {
  const [state, setState] = useState({ active: true });
  const [errorFile, setErrorFile] = useState(false)
  const fileManager = useRef(null)

  const validateInput= (e) =>{
    setErrorFile(false)
    const myFile = e.target.files[0]
    console.log(e.target,myFile)
    if (myFile.type !== 'text/csv'){
      setErrorFile(true)
    } 
      
  }

  const toggleState = e => {
    console.log(Object.values(e.target.classList));
    // console.log( typeof e.target.classList);
    const active = Object.values(e.target.classList).find(
      element => element === "active"
    );
    //   .forEach(element => {
    if (!active) {
      // console.log(3);
      setState(prev => {
        return { ...prev, active: !prev.active };
      });
    }
  };
  let formdata = new FormData();

  function handleUpload(e) {
    e.preventDefault();
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
        <div className="Submitcsv" onClick={validateInput}>Submit CSV</div>
        
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
