import axios from "axios";
import Swal from "sweetalert2";
import download from "downloadjs";
import React, { useState } from "react";

import "./view.style.scss";
import Button from "../../../../Component/button";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import BulkCertDesign2 from "../../../BulkPreview/BulkCertDesign/BulkCertDesign2";
import BulkCertDesign3 from "../../../BulkPreview/BulkCertDesign/BulkCertDesign3";
import BulkCertDesign1 from "../../../BulkPreview/BulkCertDesign/BulkCertDesign1";
import certificate from "../../../../assets/images/SinglePreview/certTemplate (1).png";
import certificate2 from "../../../../assets/images/SinglePreview/certTemplate (2).png";
import certificate3 from "../../../../assets/images/SinglePreview/certTemplate (3).png";

function ViewModal({ open, onClose, getUserCertificates, viewData }) {
  console.log(viewData);
  const [templateone, setTemplateOne] = useState(true);
  const [templatetwo, setTemplateTwo] = useState(false);
  const [templatethree, setTemplateThree] = useState(false);
  const [template, setTemplate] = useState(2);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const baseURL = "https://api.certgo.app/api";
  axios.create({
    baseURL
  });
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const axiosPrivate = axios.create({
    baseURL,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  const handleTemplate1 = () => {
    setTemplate(2);
    setTemplateOne(true);
    setTemplateTwo(false);
    setTemplateThree(false);
  };
  const handleTemplate2 = () => {
    setTemplate(4);
    setTemplateTwo(true);
    setTemplateOne(false);
    setTemplateThree(false);
  };
  const handleTemplate3 = () => {
    setTemplate(3);
    setTemplateOne(false);
    setTemplateTwo(false);
    setTemplateThree(true);
  };

  const handlePdf = async id => {
    console.log(id);
    setDownloadLoading(true);
    const res = await axiosPrivate.post("/certificates/download", {
      certificateIds: [id],
      format: "pdf",
      template: template
    });
    const data = res.data;
    if (!(data instanceof Blob)) return;
    const blob = new Blob([data], { type: "application/pdf" });
    download(blob, "certificate.pdf");
    setDownloadLoading(false);
  };
  const handlePng = async id => {
    setDownloadLoading(true);
    const res = await axiosPrivate.post("/certificates/download", {
      certificateIds: [id],
      format: "img",
      template: template
    });
    const data = res.data;
    if (!(data instanceof Blob)) return;
    const blob = new Blob([data], { type: "application/zip" });
    download(blob, "certificate.zip");
    setDownloadLoading(false);
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

  // Function to send certificate to recepient email address
  const handleSendMail = async (id) => {
    setLoading(true);
    const res = await axiosPrivate.post("/certificates/sendBulkCertificates", {
      certificateIds: [id],
      template: template,
      format: "pdf"
    });
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      setLoading(false);
      Toast.fire({
        icon: "success",
        title: "Successfully Sent certificate"
      });
    }
    else {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: "Certificate not sent"
      });
    }
  }
  if (!open) return null;
  return (
    <div onClick={onClose} className="view-modal-wrapper">
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-container__header">
          <h4>Certificate Preview</h4>
          <CloseIcon className="modal-container__cancel" onClick={onClose} />
        </div>
        <div className="modal-container__body">
          <div>
            {templateone && <BulkCertDesign1 item={viewData} />}
            {templatetwo && <BulkCertDesign2 item={viewData} />}
            {templatethree && <BulkCertDesign3 item={viewData} />}
          </div>
          <div className="center">
            <div className="center__action-buttons">
              {loading ? (
                <Button
                  name="Sending certificate..."
                  style={{ padding: "10px" }}
                />
              ) : (
                <Button
                  name="Send certificate"
                  onClick={() => handleSendMail(viewData._id)}
                  style={{ padding: "10px" }}
                />
              )}
              {downloadLoading ? (
                <div>
                  <button id="dropdown-container" style={{ padding: "10px" }}>
                    Certificate downloading...
                  </button>
                </div>
              ) : (
                <>
                  <div className="drop-download">
                    <button
                      id="dropdown-container"
                      style={{ padding: "10px" }}
                      // onMouseEnter={handleMouseEnter}
                    >
                      Download Certificate
                    </button>
                    <div className="dropdown-content">
                      <button
                        className="bulk_dropdown"
                        onClick={() => handlePdf(viewData._id)}
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handlePng(viewData._id)}
                        className="bulk_dropdown"
                      >
                        PNG
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <p style={{ marginTop: "1rem" }}>More Templates for you</p>
          </div>
          <div className="template-images">
            <img onClick={handleTemplate1} src={certificate2} alt="templates" />
            <img onClick={handleTemplate2} src={certificate} alt="templates" />
            <img onClick={handleTemplate3} src={certificate3} alt="templates" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;

