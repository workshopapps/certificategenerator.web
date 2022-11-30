import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Component/Modal";
import "./singlepreview.style.scss";
import certificate from "../../assets/images/SinglePreview/Completion - Portrait (2).png";
import certificate2 from "../../assets/images/SinglePreview/Completion - Portrait (3).png";
import certificate3 from "../../assets/images/SinglePreview/Completion - Portrait.png";
import { exportComponentAsPNG } from "react-component-export-image";

function Index({
  logo,
  certificateTitle,
  awardeeName,
  message,
  issuedBy,
  issueDate,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isAuntheticated, setIsAuntheticated] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function handleUnloggedUsers(e) {
    e.preventDefault();
    setOpenModal(!openModal);
  }

  var certificateWrapper = React.createRef();
  return (
    <div id="singlePreview">
      {/* BUTTONS TO TOGGLE BETWEEN SINGLE AND BULK CERTIFICATE */}

      <div className="button-container">
        <Link to="/">
          <button className="active">Single Certificate</button>
        </Link>
        <Link
          onClick={(e) => {
            if (isAuntheticated === false) {
              setModalMessage("Please kindly sign up to access this feature");
              handleUnloggedUsers(e);
            }
          }}
          to="/edit_bulk"
        >
          <button className="not-active">Bulk Certificate</button>
        </Link>
      </div>

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
                    <img src={logo} style={{ width: "40px" }} alt="logo" />
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
          <button
            className="send-button"
            onClick={() => {
              setOpenModal(!openModal);
              setModalMessage(
                "You need to sign up to send certificate to your mail"
              );
            }}
          >
            Send Certificate
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              exportComponentAsPNG(certificateWrapper, {
                html2CanvasOptions: { backgroundColor: "#fff" },
              });
            }}
            className="download-button"
          >
            Download Certificate
          </button>
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
      <button className="explore-button">Explore More Templates</button>
    </div>
  );
}

export default Index;
