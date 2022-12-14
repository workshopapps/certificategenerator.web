import jsPDF from "jspdf";
import JSZip from "jszip";
import download from "downloadjs";
import axios from "axios";
// import Swal from "sweetalert2";
import { saveAs } from "file-saver";
// import { toPng } from "html-to-image";
// import domtoimage from 'dom-to-image';
// import ReactToPrint from "react-to-print";
import * as htmlToImage from "html-to-image";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useRef, useCallback, useState, useEffect } from "react";

import "./bulk.style.scss";
import "@splidejs/react-splide/css";
import Modal from "../../Component/Modal";
import Button from "../../Component/button";
import { axiosPrivate } from "../../api/axios";
import BulkCertDesign1 from "./BulkCertDesign/BulkCertDesign1";
import BulkCertDesign2 from "./BulkCertDesign/BulkCertDesign2";
import BulkCertDesign3 from "./BulkCertDesign/BulkCertDesign3";
import certificate from "../../assets/images/SinglePreview/certTemplate (1).png";
import certificate2 from "../../assets/images/SinglePreview/certTemplate (2).png";
import certificate3 from "../../assets/images/SinglePreview/certTemplate (3).png";
import InteractiveModal from "./interactiveModal";


function Index() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [isAuntheticated, setIsAuntheticated] = useState(false);
  const [interactiveModal, setInteractiveModal] = useState(false);
  const [template, setTemplate] = useState(2)
  const baseURL = "https://certgo.hng.tech/api";
  axios.create({
    baseURL
  });
  const axiosPrivate = axios.create({
    baseURL,
    responseType: 'blob',
    headers: {
      "Content-Type": "application/json",
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
  const names = array.map(item => item.name);

  //STATES FOR TEMPLATES
  const [templateone, setTemplateOne] = useState(true);
  const [templatetwo, setTemplateTwo] = useState(false);
  const [templatethree, setTemplateThree] = useState(false);

  //FUNCTIONS TO HANDLE TEMPLATES

  const handleTemplate1 = () => {
    setTemplate(2)
    setTemplateOne(true);
    setTemplateTwo(false);
    setTemplateThree(false);
  };
  const handleTemplate2 = () => {
    setTemplate(4)
    setTemplateTwo(true);
    setTemplateOne(false);
    setTemplateThree(false);
  };
  const handleTemplate3 = () => {
    setTemplate(3)
    setTemplateThree(true);
    setTemplateOne(false);
    setTemplateTwo(false);
  };

  const bulkCertDesignRef = useRef();

  const handleClick = async () => {
    if (!isAuntheticated) {
      setOpenModal(true);
      setModalMessage(
        "You need to sign up or login to download bulk certificates"
      );
      return;
    }

    navigate("/comingsoon");

    // const elements = document.getElementsByClassName("multiple"); // Get all certificates as HTML Elements
    // setLoading(true);
    // setInteractiveModal(true);
    // const zip = new JSZip();
    // for (let i = 0; i < elements.length; i++) {
    //   await htmlToImage.toPng(elements[i])
    //     .then(dataUrl => {
    //       console.log("Data", dataUrl);
    //       download(dataUrl, `certgo${i}.png`);
    // const img = new Image();
    // img.src = dataUrl;
    // document.body.appendChild(img);
    // console.log("Image", document.body.appendChild(img));
    // const pngs = zip.folder("certificates");
    // pngs.file(`certgo${i}.png`, dataUrl.output('blob'));
    //     })
    //     .catch(function (error) {
    //       console.error('oops, something went wrong!', error);
    //     });
    // }
    // zip.generateAsync({ type: 'blob' }).then(function (content) {
    //   saveAs(content, 'certificates.zip');
    // })
    // setLoading(false);
    // setInteractiveModal(false);

    // setLoading(true);
    // if (bulkCertDesignRef.current === null) {
    //   setLoading(false);
    //   return;
    // };
    // toPng(bulkCertDesignRef.current, { cacheBust: true, backgroundColor: "#f8fffe", canvasWidth: 388.5, canvasHeight: 299.4 })
    //   .then(dataUrl => {
    //     setLoading(false);
    //     const link = document.createElement('a');
    //     link.download = 'certgo.png';
    //     link.href = dataUrl;
    //     link.click();
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err)
    //   })
  };

  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top-end",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: toast => {
  //     toast.addEventListener("mouseenter", Swal.stopTimer);
  //     toast.addEventListener("mouseleave", Swal.resumeTimer);
  //   }
  // });

  // const downloadMultiplePdfs = async () => {
  //   if (!isAuntheticated) {
  //     setOpenModal(true);
  //     setModalMessage("You need to sign up or login to download bulk certificates");
  //     return;
  //   }
  //   const elements = document.getElementsByClassName("multiple"); // Get all certificates as HTML Elements
  //   setLoading(true);
  //   for (let i = 0; i < elements.length; i++) {
  //     const doc = new jsPDF("p", "px", [339.4, 339.4]); // Initialize a new jsPDF instance
  //     const item = elements[i];
  //     setInteractiveModal(true);
  //     await createPdf({ doc, item });
  //     doc.save(`${names[i]}.pdf`); // Download generated pdf doc using jspdf's save() method
  //   }
  //   setLoading(false);
  //   setInteractiveModal(false);
  // };

  // const downloadZipPdf = async () => {
  //   if (!isAuntheticated) {
  //     setOpenModal(true);
  //     setModalMessage("You need to sign up or login to download bulk certificates");
  //     return;
  //   }
  //   const elements = document.getElementsByClassName("multiple"); // Get all certificates as HTML Elements
  //   setLoading(true);
  //   const zip = new JSZip();
  //   for (let i = 0; i < elements.length; i++) {
  //     const doc = new jsPDF("p", "px", [339.4, 339.4]); // Initialize a new jsPDF instance
  //     const item = elements[i];
  //     setInteractiveModal(true);
  //     await createPdf({ doc, item });

  //     const pdfs = zip.folder("certificates");
  //     pdfs.file(`${names[i]}.pdf`, doc.output('blob'));
  //     //doc.save(`certgo${i}.pdf`); // Download generated pdf doc using jspdf's save() method
  //   }
  //   zip.generateAsync({ type: 'blob' }).then(function (content) {
  //     saveAs(content, 'certificates.zip');
  //   })
  //   setLoading(false);
  //   setInteractiveModal(false);
  // };

  // const createPdf = async ({ doc, elements }) => {
  // const createPdf = async ({ doc, item }) => {
  //   const padding = 10;
  //   const marginTop = 10;
  //   let top = marginTop;

  //   for (let i = 0; i < elements.length; i++) {
  //   const el = elements.item(i);
  //   const el = item;
  //   Convert each HTML Element with certificate into image (with htmlToImage library)
  //   const imgData = await htmlToImage.toPng(el);

  //   let elHeight = el.offsetHeight;
  //   let elWidth = el.offsetWidth;

  //   const pageWidth = doc.internal.pageSize.getWidth();

  //   if (elWidth > pageWidth) {
  //     const ratio = pageWidth / elWidth;
  //     elHeight = elHeight * ratio - padding * 2;
  //     elWidth = elWidth * ratio - padding * 2;
  //   }

  //   const pageHeight = doc.internal.pageSize.getHeight();

  //   As we are adding multiple certificates, create a new pdf page when needed
  //   if (top + elHeight > pageHeight) {
  //     doc.addPage();
  //     top = marginTop;
  //   }

  //   Add converted certificate image to the pdf doc with jsPDF's addImage() method
  //   doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${item}`);
  //   top += elHeight + marginTop;
  //   }
  // };

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

      navigate("/comingsoon");

      //   const doc = new jsPDF("p", "px", [339.4, 339.4]); // Initialize a new jsPDF instance
      //   const elements = document.getElementsByClassName("multiple"); // Get all certificates as HTML Elements
      //   setEmailLoading(true);
      //   await createPdf({ doc, elements });
      //   const data = doc.save(`certgo.pdf`);

      //   // get token from localstorage
      //   const token = JSON.parse(localStorage.getItem("userData")).token;

      //   // create form data and add pdf
      //   let formData = new FormData();
      //   formData.append("file", data);

      //   // send the form data
      //   const uploadUrl = "/sendEmailNotifications";
      //   let response = await axiosFormData.post(uploadUrl, formData, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "multipart/form-data"
      //     }
      //   });
      //   // toast message
      //   const dataMsg = response.data;
      //   if (response.status === 200) {
      //     setEmailLoading(false);
      //     Toast.fire({
      //       icon: "success",
      //       title: dataMsg.message
      //     });
      //   } else if (response.status === 403) {
      //     setEmailLoading(false);
      //     Toast.fire({
      //       icon: "error",
      //       title: dataMsg.error
      //     });
      //   } else {
      //     setEmailLoading(false);
      //     Toast.fire({
      //       icon: "error",
      //       title: dataMsg.message
      //     });
      //     throw new Error(dataMsg.message);
      //   }
    } catch (error) {
      setEmailLoading(false);
      // Toast.fire({
      //   icon: "error",
      //   title: "Internal Server Error"
      // });
    }
  };

  //   const pageStyle = `
  //   @page {
  //     size: 80mm 50mm;
  //   }

  //   @media all {
  //     .pagebreak {
  //       display: none;
  //     }
  //   }

  //   @media print {
  //     .pagebreak {
  //       page-break-before: always;
  //     }
  //   }
  // `;

  const downloadMultiplePdfs = async () => {
    console.log(array);
    const res = await axiosPrivate.post("/certificates/download/unauthorised", {
      certificates: array,
      format: "pdf-split",
      template: template,
    });
    const data = res.data
    if(!(data instanceof Blob)) return  
    const blob = new Blob([data], { type: 'application/zip' });
    download(blob, "certificate.zip")
  };

  const handlePng = async () => {
    const res = await axiosPrivate.post("/certificates/download/unauthorised", {
      certificates: array,
      format: "img",
      template: template,
    });
    const data = res.data
    if(!(data instanceof Blob)) return  
    const blob = new Blob([data], { type: 'application/zip' });
    download(blob, "certificate.zip")
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
                  ref={bulkCertDesignRef}
                  className="page-break"
                />
              )}
              {templatetwo && (
                <BulkCertDesign2
                  item={item}
                  ref={bulkCertDesignRef}
                  className="page-break"
                />
              )}
              {templatethree && (
                <BulkCertDesign3
                  item={item}
                  ref={bulkCertDesignRef}
                  className="page-break"
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
                name="Certificates downloading..."
                style={{ padding: "10px" }}
              />
            </div>
          ) : (
            <>
              <Button
                name="Download Certificates"
                style={{ padding: "10px" }}
              />
              <div className="dropdown-content" style={{ marginTop: "0px" }}>
                {/* <ReactToPrint
                  pageStyle={pageStyle}
                  content={() => bulkCertDesignRef.current}
                  trigger={() => <Button name="PDF" style={{ padding: "10px", width: "120px" }} className="bulk_dropdown" />}
                /> */}
                <Button
                  name="PDF"
                  style={{ padding: "10px", width: "120px" }}
                  onClick={downloadMultiplePdfs}
                  className="bulk_dropdown"
                />
                {/* <Button
                  name="ZIP"
                  style={{ padding: "10px", width: "120px" }}
                  // onClick={downloadZipPdf}
                  className="bulk_dropdown"
                /> */}
                <Button
                  name="PNG"
                  style={{ padding: "10px", width: "120px" }}
                  onClick={handlePng}
                  className="bulk_dropdown"
                />
              </div>
            </>
          )}
        </div>
        {/* <Button name="Download Certificates as PDF" style={{ padding: "10px" }} /> */}
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
