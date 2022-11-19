import React from "react";
import "./card.style.scss"
const Card = ({ item }) => {
  return (
    <div className="card total-Issued">
      <p>{item.title}</p>
      <div className="icon-wrapper">
        <span className="icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_71_1260)">
              <path
                d="M7.50065 9.16675V14.1667L9.16732 12.5001M7.50065 14.1667L5.83398 12.5001"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3327 8.33341V12.5001C18.3327 16.6667 16.666 18.3334 12.4993 18.3334H7.49935C3.33268 18.3334 1.66602 16.6667 1.66602 12.5001V7.50008C1.66602 3.33341 3.33268 1.66675 7.49935 1.66675H11.666"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3327 8.33341H14.9993C12.4993 8.33341 11.666 7.50008 11.666 5.00008V1.66675L18.3327 8.33341Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_71_1260">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        {item.count > 0 ? <span className="count">{item.count}</span> : <span className="count">N/A</span>}
      </div>
    </div>
  );
};

export default Card;
