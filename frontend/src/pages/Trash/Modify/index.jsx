import "./modify.style.scss";
// img
import CertificateImg from "../../../assets/images/Choice/cert.svg";

import Sidebar from "./Sidebar";

const Modify = () => {
  return (
    <div className="modifyContainer">
      <Sidebar />
      <div className="certificate">
        <img src={CertificateImg} alt="certicificate" />
      </div>
    </div>
  );
};

export default Modify;
