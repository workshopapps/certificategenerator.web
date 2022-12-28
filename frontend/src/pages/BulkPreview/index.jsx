import axios from "axios";
import Swal from "sweetalert2";
import download from "downloadjs";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "./bulk.style.scss";
import "@splidejs/react-splide/css";
import Modal from "../../Component/Modal";
import Button from "../../Component/button";
import InteractiveModal from "./interactiveModal";
import BulkCertDesign1 from "./BulkCertDesign/BulkCertDesign1";
import BulkCertDesign2 from "./BulkCertDesign/BulkCertDesign2";
import BulkCertDesign3 from "./BulkCertDesign/BulkCertDesign3";
import certificate from "../../assets/images/SinglePreview/certTemplate (1).png";
import certificate2 from "../../assets/images/SinglePreview/certTemplate (2).png";
import certificate3 from "../../assets/images/SinglePreview/certTemplate (3).png";

function Index() {
  const navigate = useNavigate();
  const [template, setTemplate] = useState(2);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [isAuntheticated, setIsAuntheticated] = useState(false);
  const [interactiveModal, setInteractiveModal] = useState(false);
  const baseURL = "https://api.certgo.app/api";
  axios.create({
    baseURL
  });
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const axiosUnauth = axios.create({
    baseURL,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const axiosPrivate = axios.create({
    baseURL,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  });
  useEffect(() => {
    localStorage.getItem("userData")
      ? setIsAuntheticated(true)
      : setIsAuntheticated(false);
  }, []);
  // Getting the file data from the local storage and parsing its values
  const savedData = localStorage.getItem("dataKey");
  const array = JSON.parse(savedData);
  const arrayIds = array.map(item => item.uuid);

  //STATES FOR TEMPLATES
  const [templateone, setTemplateOne] = useState(true);
  const [templatetwo, setTemplateTwo] = useState(false);
  const [templatethree, setTemplateThree] = useState(false);

  //FUNCTIONS TO HANDLE TEMPLATES

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

  const bulkCertDesignRef = useRef();

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

  // Function to send certificate to recepients email addresses
  const handleSendCertificates = async e => {
    try {
      localStorage.getItem("userData")
        ? setIsAuntheticated(true)
        : setIsAuntheticated(false);

      if (!isAuntheticated) {
        setOpenModal(true);
        setModalMessage(
          "You need to sign up or login to download bulk certificates"
        );
        return;
      }
      setEmailLoading(true);
      const res = await axiosPrivate.post("/certificates/sendBulkCertificates", {
        certificateIds: arrayIds,
        template: template,
        format: "pdf"
      });
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        setEmailLoading(false);
        Toast.fire({
          icon: "success",
          title: "Successfully Sent certificates"
        });
      }
    } catch (error) {
      setEmailLoading(false);
      Toast.fire({
        icon: "success",
        title: error.message
      });
    }
  };

  const downloadMultiplePdfs = async () => {
    if (!isAuntheticated) {
      setOpenModal(true);
      setModalMessage(
        "You need to sign up or login to download bulk certificates"
      );
      return;
    }
    setLoading(true);
    setInteractiveModal(true);
    const res = await axiosUnauth.post("/certificates/download/unauthorised", {
      certificates: array,
      format: "pdf-split",
      template: template
    });
    const data = res.data;
    if (!(data instanceof Blob)) return;
    const blob = new Blob([data], { type: "application/zip" });
    download(blob, "certificate.zip");
    setLoading(false);
    setInteractiveModal(false);
  };

  const handlePng = async () => {
    if (!isAuntheticated) {
      setOpenModal(true);
      setModalMessage(
        "You need to sign up or login to download bulk certificates"
      );
      return;
    }
    setLoading(true);
    setInteractiveModal(true);
    const res = await axiosUnauth.post("/certificates/download/unauthorised", {
      certificates: array,
      format: "img",
      template: template
    });
    const data = res.data;
    if (!(data instanceof Blob)) return;
    const blob = new Blob([data], { type: "application/zip" });
    download(blob, "certificate.zip");
    setLoading(false);
    setInteractiveModal(false);
  };

  return (
    <div id="bulk-preview">
      {/* PREVIEW OF BULK GENERATED CERTIFICATES  */}
      <h2>Preview of Generated Certificates</h2>
      <Modal
        open={openModal}
        modalText={modalMessage}
        onClose={() => setOpenModal(false)}
      />
      <InteractiveModal
        open={interactiveModal}
        onClose={() => setInteractiveModal(false)}
      />
      <section id="bulk-images-desktop">
        <Splide
          className="bulk-images-wrapper"
          options={{
            rewind: true,
            gap: "30px",
            perPage: 3,
            drag: "free",
            arrows: true,
            pagination: true,
            breakpoints: {
              640: {
                perPage: 1
              },
              798: {
                perPage: 2
              }
            }
          }}
        >
          {/* Mapping through the data */}
          {array.map((item, id) => (
            <SplideSlide key={id}>
              {templateone && (
                <BulkCertDesign1
                  item={item}
                  className="page-break"
                  ref={bulkCertDesignRef}
                />
              )}
              {templatetwo && (
                <BulkCertDesign2
                  item={item}
                  className="page-break"
                  ref={bulkCertDesignRef}
                />
              )}
              {templatethree && (
                <BulkCertDesign3
                  item={item}
                  className="page-break"
                  ref={bulkCertDesignRef}
                />
              )}
            </SplideSlide>
          ))}
        </Splide>
      </section>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}
      <div id="bulk-btns">
        <div className="dropdown">
          {loading ? (
            <div>
              <Button
                style={{ padding: "10px" }}
                name="Certificates downloading..."
              />
            </div>
          ) : (
            <>
              <Button
                style={{ padding: "10px" }}
                name="Download Certificates"
              />
              <div className="dropdown-content" style={{ marginTop: "0px" }}>
                <Button
                  name="PDF"
                  className="bulk_dropdown"
                  onClick={downloadMultiplePdfs}
                  style={{ padding: "10px", width: "120px" }}
                />
                <Button
                  name="PNG"
                  onClick={handlePng}
                  className="bulk_dropdown"
                  style={{ padding: "10px", width: "120px" }}
                />
              </div>
            </>
          )}
        </div>
        <div>
          {emailLoading ? (
            <div>
              <Button
                className="btnLight"
                style={{ padding: "10px" }}
                name="Sending certificates..."
              />
            </div>
          ) : (
            <Button
              className="btnLight"
              name="Send Certificates"
              style={{ padding: "10px" }}
              onClick={handleSendCertificates}
            />
          )}
        </div>
      </div>

      {/* OTHER TEMPLATES TO CHOOSE FROM */}
      <h2>Even More Templates for you</h2>
      <div className="single-images" style={{ marginBottom: "50px" }}>
        <img onClick={handleTemplate1} src={certificate2} alt="templates" />
        <img onClick={handleTemplate2} src={certificate} alt="templates" />
        <img onClick={handleTemplate3} src={certificate3} alt="templates" />
      </div>
    </div>
  );
}

export default Index;
