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
  setPresentbtncolor,
  setPresentcategory,
}) {
  // filter category btn states
  const [btn1active, setBtn1Active] = useState(false);
  const [btn2active, setBtn2Active] = useState(false);
  const [btn3active, setBtn3Active] = useState(false);
  const [btn4active, setBtn4Active] = useState(false);
  const [btn5active, setBtn5Active] = useState(false);
  const [btn6active, setBtn6Active] = useState(false);
  const [btn7active, setBtn7Active] = useState(false);
  //color
  const [btn8active, setBtn8Active] = useState(false);
  const [btn9active, setBtn9Active] = useState(false);
  const [btn10active, setBtn10Active] = useState(false);
  const [btn11active, setBtn11Active] = useState(false);
  const [btn12active, setBtn12Active] = useState(false);
  const [btn13active, setBtn13Active] = useState(false);
  const [btn14active, setBtn14Active] = useState(false);
  
//new states
  ;  


  //restore btn states
  const resetFilterBtns = () => {
    setBtn1Active(false);
    setBtn2Active(false);
    setBtn3Active(false);
    setBtn4Active(false);
    setBtn5Active(false);
    setBtn6Active(false);
    setBtn7Active(false);
    setBtn8Active(false);
    setBtn9Active(false);
    setBtn10Active(false);
    setBtn11Active(false);
    setBtn12Active(false);
    setBtn13Active(false);
    setBtn14Active(false);

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
                //return selectedCategory("completion");
                setPresentcategory("completion")
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
                //return selectedCategory("participation");
                setPresentcategory("participation")
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
                setPresentcategory("appreciation")
                //return selectedCategory("appreciation");
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
                //return selectedCategory("recognition");
                setPresentcategory("recognition")
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
                //return selectedCategory("attendance");
                setPresentcategory("attendance")
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
                //return selectedCategory("excellence");
                setPresentcategory("excellence");
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
                //return selectedCategory("achievement");
                setPresentcategory("achievement")
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
            

                  
            <button
              onClick={() => {
                setBtn8Active(!btn8active);
                //return selectedCategory("red");
                setPresentbtncolor("red")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn8active ? "#ff4500" : "#F4F4F4",
                border: btn8active ? "none" : "none",
                
                }}
            >
              <div>
              <img src={redimg} alt="" />
              </div>
            </button>
            <button
              onClick={() => {
                setBtn9Active(!btn9active);
                //return selectedCategory(<img src={brownimg} alt=""/>);
                setPresentbtncolor("brown")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn9active ? "rgb(83, 25, 25)" : "#F4F4F4",
                border: btn9active ? "none" : "none"
                }}
            >
              <div>
              <img src={brownimg} alt="" />
            </div>
            </button>
            <button
              onClick={() => {
                setBtn10Active(!btn10active);
                //return selectedCategory(<img src={yellowimg} alt=""/>);
                setPresentbtncolor("yellow")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn10active ? "#ffa500" : "#F4F4F4",
                border: btn10active ? "none" : "none"
                }}
            >
              <div>
              <img src={yellowimg} alt="" />
            </div>
            </button>
            <button
              onClick={() => {
                setBtn11Active(!btn11active);
                //return selectedCategory("green");
                setPresentbtncolor("green")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn11active ? "rgb(3, 88, 3)" : "#F4F4F4",
                border: btn11active ? "none" : "none"
                }}
            >
              <div>
              <img src={greenimg} alt="" />
            </div>
            </button>
            <button
              onClick={() => {
                setBtn12Active(!btn12active);
                //return selectedCategory("blue");
                setPresentbtncolor("blue")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn12active ? "rgb(6, 6, 119)" : "#F4F4F4",
                border: btn12active ? "none" : "none"
                }}
            >
              <div>
              <img src={blueimg} alt="" />
            </div>
            </button>
            <button
              onClick={() => {
                setBtn13Active(!btn13active);
                //return selectedCategory(<img src={blackimg} alt=""/>);
                setPresentbtncolor("black")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn13active ? "rgb(20, 17, 17)" : "#F4F4F4",
                border: btn13active ? "none" : "none"
                }}
            >
              <div>
              <img src={blackimg} alt="" />
            </div>
            </button> 
            <button
              onClick={() => {
                setBtn14Active(!btn14active);
                //return selectedCategory(<img src={whiteimg} alt=""/>);
                setPresentbtncolor("white")
              }}
              className="sort-btnmodal"
              style={{
                backgroundColor: btn14active ? "#FFFFFF" : "#F4F4F4",
                border: btn14active ? "none" : "none"
                }}
            >
             <div>
              <img src={whiteimg} alt="" />
            </div>
            </button>                        
            
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
