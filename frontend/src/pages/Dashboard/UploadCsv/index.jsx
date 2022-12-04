import "./uploadcsv.style.scss";
import CSVSample from "../../../assets/images/CSV-sample.png";
import UploadVector from "../../../assets/images/uploadPage/uploadVector.svg";
import { useState } from "react";
import Swal from "sweetalert2";
import useAppProvider from "../../../hooks/useAppProvider"
import {axiosFormdata} from "../../../api/axios";
import Loader from "../Loader";

const UploadCSV = () => {
  const [state, setState] = useState({ active: true });
  const [loading, setLoading] = useState(false)
  const { setCsvData } = useAppProvider();

//   const toggleState = e => {
//     console.log(Object.values(e.target.classList));
//     const active = Object.values(e.target.classList).find(
//       element => element === "active"
//     );
//     //   .forEach(element => {
//     if (!active) {
//       // console.log(3);
//       setState(prev => {
//         return { ...prev, active: !prev.active };
//       });
//     }
//   };

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
      const res = await axiosFormdata.post('/certificates', formData);
      console.log(res);
      if (res.status === 400) {
        setLoading(false);
        console.log('load');
        Toast.fire({
          icon: "error",
          title: "Page not found"
        });
      } else if (res.status === 500) {
        setLoading(false);
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      } else {
        setCsvData(res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <button onClick={(e) => handleUpload(e)}>{loading ? <Loader/> : "Submit CSV"}</button>
    </article>
  );
};

export default UploadCSV;