import React from "react";
import { useState } from "react";
import { certificates, dummyData } from "../../utils";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import "./view.style.scss";

function ViewModal({ open, onClose, getUserCertificates, viewData }) {
  if (!open) return null;
  console.log(viewData);
  return (
    <div onClick={onClose} id="viewModal" className="view-modal-wrapper">
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-container__header">
          <h4>Certificate Preview</h4>
          <CloseIcon className="modal-container__cancel" onClick={onClose} />
        </div>
        <div className="modal-container__body">
          <div>
            {viewData ? (
              <div id="downloadWrapper">
                <div id="certificateWrapper">
                  <div id="container-wrapper">
                    <div id="container-design">
                      <div className="sample3"></div>
                      <div className="sample"></div>

                      <div id="single-preview-card">
                        <div id="single-preview-text">
                          <div id="preview-text">
                            {/* <img src={logo} style={{ width: "100px" }} alt="logo" /> */}
                            <h1>{viewData.award}</h1>

                            <p>THIS CERTIFIES THAT</p>
                            <h2>{viewData.name}</h2>
                            <h6>{viewData.description}</h6>
                          </div>

                          <div className="single-preview-issue">
                            <div className="issue-by">
                              <h6>{viewData.signed}</h6>
                              <div className="line"></div>
                              <p>ISSUED BY</p>
                            </div>

                            <div className="issue-by">
                              <h6>{viewData.date}</h6>
                              <div className="line"></div>
                              <p>ISSUE DATE</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="sample2"></div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
