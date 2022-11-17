import React from "react";
import "./modal.style.scss";

export default function Filter() {
  return (
    <div>
      <div className="modal-card">
        <div className="modal-card__type">
          <h2>Certificate Type</h2>
          <div className="filter-btn-wrapper">
            <button className="sort-btn">Completion</button>
            <button className="sort-btn">Participation</button>
            <button className="sort-btn">Appreciation</button>
            <button className="sort-btn">Recognition</button>
            <button className="sort-btn">Attendance</button>
            <button className="sort-btn">Excellence</button>
            <button className="sort-btn">Achievement</button>
          </div>
        </div>
        <div className="modal-card__layout">
          <h2>Layout</h2>
          <input type="checkbox" name="landscape" id="landscape" />
          <label htmlFor="landscape">Landscape</label>
          <input type="checkbox" name="portrait" id="portrait" />
          <label htmlFor="portrait">Portrait</label>
        </div>
        <div className="modal-card__color">
          <h2>Colour</h2>
          <div className="color-box-wrapper">
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="29"
                    height="29"
                    rx="3.5"
                    fill="#C73434"
                    stroke="#C73434"
                  />
                </svg>
              </span>
            </div>
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#964B00" />
                </svg>
              </span>
            </div>
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#FFA500" />
                </svg>
              </span>
            </div>
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#3C7D36" />
                </svg>
              </span>
            </div>
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#3438AD" />
                </svg>
              </span>
            </div>
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="4" fill="#222222" />
                </svg>
              </span>
            </div>
            <div className="color-box">
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="29"
                    height="29"
                    rx="3.5"
                    fill="white"
                    stroke="#A9A9A9"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="modal-card__submit">
          <button className="btn-submit btn-submit--apply">Apply</button>
          <button className="btn-submit btn-submit--cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
