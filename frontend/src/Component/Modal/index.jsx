import React from "react";
import { Link } from "react-router-dom";
import "./modal.style.scss";

function index({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="modal-wrapper">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-container__text">
          <Link to="/signup">Sign up enjoy this feature and more</Link>
        </h3>
        <div className="modal-container__btns">
          <Link to="/signup">
            <button onClick={onClose} className="modal-container__btn">
              Sign Up
            </button>
          </Link>

          <button
            onClick={onClose}
            className="modal-container__btn modal-container__btn--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
