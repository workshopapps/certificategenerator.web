import React, { useState } from "react";
import "./modal.style.scss";

import redimg from "./assets/Rectangle270.png";
import blueimg from "./assets/Rectangle271.png";
import brownimg from "./assets/Rectangle272.png";
import yellowimg from "./assets/Rectangle273.png";
import greenimg from "./assets/Rectangle274.png";
import blackimg from "./assets/Rectangle275.png";
import whiteimg from "./assets/Rectangle276.png";

export default function Filter({
  modalClose,
  open,
  selectedCategory,
  applyCategories,
  setCategory,
}) {
  // filter category btn states
  const [btn1active, setBtn1Active] = useState(false);
  const [btn2active, setBtn2Active] = useState(false);
  const [btn3active, setBtn3Active] = useState(false);
  const [btn4active, setBtn4Active] = useState(false);
  const [btn5active, setBtn5Active] = useState(false);
  const [btn6active, setBtn6Active] = useState(false);
  const [btn7active, setBtn7Active] = useState(false);

  //restore btn states
  const resetFilterBtns = () => {
    setBtn1Active(false);
    setBtn2Active(false);
    setBtn3Active(false);
    setBtn4Active(false);
    setBtn5Active(false);
    setBtn6Active(false);
    setBtn7Active(false);
  }


  if (!open) return null;

  return (
    <div id="modal">
      <div className="modal-card">
        <div className="modal-card__type">
          <h2>Certificate Type</h2>
          <div className="filter-btn-wrappermodal">
            <button
              onClick={() => {
                setBtn1Active(!btn1active);
                return selectedCategory("completion");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn1active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn1active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Completion
            </button>
            <button
              onClick={() => {
                setBtn2Active(!btn2active);
                return selectedCategory("participation");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn2active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn2active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Participation
            </button>
            <button
              onClick={() => {
                setBtn3Active(!btn3active);
                return selectedCategory("appreciation");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn3active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn3active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Appreciation
            </button>
            <button
              onClick={() => {
                setBtn4Active(!btn4active);
                return selectedCategory("recognition");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn4active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn4active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Recognition
            </button>
            <button
              onClick={() => {
                setBtn5Active(!btn5active);
                return selectedCategory("attendance");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn5active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn5active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Attendance
            </button>
            <button
              onClick={() => {
                setBtn6Active(!btn6active);
                return selectedCategory("excellence");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn6active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn6active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Excellence
            </button>
            <button
              onClick={() => {
                setBtn7Active(!btn7active);
                return selectedCategory("achievement");
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn7active ? "#B2E1D9" : "#F4F4F4",
                borderColor: btn7active ? "#19A68E" : "#A9A9A9",
              }}
            >
              Achievement
            </button>
          </div>
        </div>

        <div className="modal-card__color">
          <h2>Color</h2>
          <div className="filter-colors">
            <div>
              <img src={redimg} alt="" />
            </div>
            <div>
              <img src={brownimg} alt="" />
            </div>
            <div>
              <img src={yellowimg} alt="" />
            </div>
            <div>
              <img src={greenimg} alt="" />
            </div>
            <div>
              <img src={blueimg} alt="" />
            </div>
            <div>
              <img src={blackimg} alt="" />
            </div>
            <div>
              <img src={whiteimg} alt="" />
            </div>
          </div>
        </div>

        <div className="modal-card__submit">
          <button
            onClick={() => {
              applyCategories();
              modalClose();
              resetFilterBtns();
            }}
            className="btn-submit btn-submit--apply"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setCategory("");
              modalClose();
              resetFilterBtns();
            }}
            className="btn-submit btn-submit--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
