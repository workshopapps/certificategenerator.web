import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Component/Modal";
import Button from "../../Component/button";
import "./singlepreview.style.scss";
import certificate from "../../assets/images/SinglePreview/Completion - Portrait (2).png";
import certificate2 from "../../assets/images/SinglePreview/Completion - Portrait (3).png";
import certificate3 from "../../assets/images/SinglePreview/Completion - Portrait.png";
import { exportComponentAsPNG } from "react-component-export-image";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { axiosFormData } from "../../api/axios";
import Swal from "sweetalert2";

function SinglePreview({
  logo,
  certificateTitle,
  awardeeName,
  message,
  issuedBy,
  issueDate
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isAuntheticated, setIsAuntheticated] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    localStorage.getItem("userData")
      ? setIsAuntheticated(true)
      : setIsAuntheticated(false);
  }, []);

  function handleUnloggedUsers(e) {
    e.preventDefault();
    setOpenModal(!openModal);
  }

  // REF FOR PNG AND PDF
  var certificateWrapper = React.createRef();

  // FUNCTION FOR HANDLING PDF DOWNLOAD

  const handleDownloadPdf = async () => {
    const element = certificateWrapper.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "l",
      unit: "pt",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${awardeeName}.pdf`);
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
  const handleSendCertificate = async e => {
    try {
      localStorage.getItem("userData")
        ? setIsAuntheticated(true)
        : setIsAuntheticated(false);

      if (!isAuntheticated) {
        setOpenModal(!openModal);
        setModalMessage("You need to sign up to send certificate to your mail");
        console.log("ok");
        return;
      }
      const element = certificateWrapper.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "l",
        unit: "pt",
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

      // get token from localstorage
      const token = JSON.parse(localStorage.getItem("userData")).token;

      // create form data and add pdf
      let formData = new FormData();
      formData.append("file", data);

      // send the form data
      const uploadUrl = "/sendEmailNotifications";
      let response = await axiosFormData.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      // toast message
      const dataMsg = response.data;
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: dataMsg.message
        });
      } else if (response.status === 403) {
        Toast.fire({
          icon: "error",
          title: dataMsg.error
        });
      } else {
        Toast.fire({
          icon: "error",
          title: dataMsg.message
        });
        throw new Error(dataMsg.message);
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Internal Server Error"
      });
    }
  };
  return (
    <div id="singlePreview">
      {/* IMAGE OF YOUR CERTIFICATE READY TO BE DOWNLOADED OR SENT */}

      <div className="certificate-header">
        <h4>Your certificate is ready!</h4>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          modalText={modalMessage}
        />
      </div>

      {/* START OF CERTIFICATE */}

      <div id="downloadWrapper" ref={certificateWrapper}>
        <div id="certificateWrapper">
          <div id="container-wrapper">
            <div id="container-design">
              <div className="sample3"></div>
              <div className="sample"></div>

              <div id="single-preview-card">
                <div id="single-preview-text">
                  <div id="preview-text">
                    <img src={logo} style={{ width: "100px" }} alt="logo" />
                    <h1>{certificateTitle}</h1>

                    <p>THIS CERTIFIES THAT</p>
                    <h2>{awardeeName}</h2>
                    <h6>{message}</h6>
                  </div>

                  <div className="single-preview-issue">
                    <div className="issue-by">
                      <h6>{issuedBy}</h6>
                      <div className="line"></div>
                      <p>ISSUED BY</p>
                    </div>

                    <div className="issue-by">
                      <h6>{issueDate}</h6>
                      <div className="line"></div>
                      <p>ISSUE DATE</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sample2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* END OF CERTIFICATE */}

      <div className="certificate-share-hero">
        {/* BUTTONS FOR EITHER SENDIMG OR DOWNLOADING */}

        <div className="buttons">
          <Button
            className="send-button"
            onClick={e => {
              handleSendCertificate(e);
            }}
          >
            Send Certificate
          </Button>
          <div className="dropdown">
            <button className="dropbtn download-button">
              Download Certificate
            </button>
            <div className="dropdown-content">
              <button
                onClick={e => {
                  e.preventDefault();
                  exportComponentAsPNG(certificateWrapper, {
                    fileName: `${awardeeName}`,
                    html2CanvasOptions: { backgroundColor: "#fff" }
                  });
                }}
                className="png-button"
              >
                PNG
              </button>
              <button onClick={handleDownloadPdf} className="pdf-button">
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER TEMPLATES TO CHOOSE FROM */}

      <h2>Even More Templates for you</h2>
      <div className="single-images">
        <img src={certificate} alt="templates" />
        <img src={certificate2} alt="templates" />
        <img src={certificate3} alt="templates" />
      </div>

      {/* BUTTON TO EXPLORE MORE TEMPLATES */}
      <Link to="/templates">
        <Button
          name="Explore More Templates"
          style={{ margin: " 2rem auto" }}
        ></Button>
      </Link>
    </div>
  );
}

export default SinglePreview;
