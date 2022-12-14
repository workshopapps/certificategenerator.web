import React from "react";
import { Link } from "react-router-dom";

import "./modal.style.scss";
import Button from "../../../Component/button";

function InteractiveModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="modal-wrapperx">
      <div className="modal-containerx" onClick={e => e.stopPropagation()}>
        <div className="cancel-btn-wrapper">
          <button onClick={onClose} className="modal-containerx__cancel">
            Close{" "}
            <span className="cancel-x-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
        <div>
          <h3 className="modal-containerx__header">
            Your certificates are being processed...
          </h3>
          <p className="modal-containerx__text">
            Do you want to do something else while waiting for your download?
          </p>
        </div>
        <div className="modal-containerx__btns">
          <Link to="/" target="_blank">
            <Button onClick={onClose} className="modal-containerx__btn">
              Continue exploring
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InteractiveModal;
