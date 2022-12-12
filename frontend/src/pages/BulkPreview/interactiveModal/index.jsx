import React from "react";
import { Link } from "react-router-dom";

import "./modal.style.scss";
import Button from "../../../Component/button";

function InteractiveModal({ open, onClose }) {
  // const location = useLocation();

  // // but you can use a location instead
  // const loginLocation = {
  //   pathname: "/login",
  //   state: { fromDashboard: true, from: location }
  // };
  // const handleLoginBtn = () => {
  //   console.log("login");
  // };
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
            Your certificates are downloading...
          </h3>
          <p className="modal-containerx__text">            
            Do you want to do something else while waiting for your download?
          </p>
        </div>
        <div className="modal-containerx__btns">
          <Link to="/" target="_blank">
            <Button onClick={onClose} className="modal-containerx__btn">
              Try something else
            </Button>
          </Link>
          {/* <Link to="/login" state={{ from: location }}>
            <Button
              onClick={handleLoginBtn}
              className=" btnLight modal-containerx__btn modal-containerx__btn--signin"
            >
              Login
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default InteractiveModal;
