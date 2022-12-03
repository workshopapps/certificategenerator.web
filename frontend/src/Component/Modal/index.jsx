import React from "react";
import { Link } from "react-router-dom";
import "./modal.style.scss";

function index({ open, onClose, modalText }) {
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
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
        <div>
          <h3 className="modal-containerx__header">Oops!!!</h3>
          <p className="modal-containerx__text">{modalText}</p>
        </div>
        <div className="modal-containerx__btns">
          <Link to="/signup">
            <button onClick={onClose} className="modal-containerx__btn">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button
              onClick={onClose}
              className="modal-containerx__btn modal-containerx__btn--signin"
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
