import React from "react";
import "./modal.style.scss";

export default function Filter() {
  return (
    <div>
      <div className="modal-card">
        <div className="modal-card__type">
          <h2>Certificate Type</h2>
          <button className="sort-btn">Completion</button>
          <button className="sort-btn">Participation</button>
          <button className="sort-btn">Appreciation</button>
          <button className="sort-btn">Recognition</button>
          <button className="sort-btn">Attendance</button>
          <button className="sort-btn">Excellence</button>
          <button className="sort-btn">Achievement</button>
        </div>
        <div className="modal-card__layout">
          <input type="checkbox" name="landscape" id="landscape" />
          <label htmlFor="landscape"></label>
          <input type="checkbox" name="portrait" id="portrait" />
          <label htmlFor="portrait"></label>
        </div>
        <div className="modal-card__color">
          <div className="color-box">
            <span></span>
          </div>
          <div className="color-box">
            <span></span>
          </div>
          <div className="color-box">
            <span></span>
          </div>
          <div className="color-box">
            <span></span>
          </div>
          <div className="color-box">
            <span></span>
          </div>
          <div className="color-box">
            <span></span>
          </div>
          <div className="color-box">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
