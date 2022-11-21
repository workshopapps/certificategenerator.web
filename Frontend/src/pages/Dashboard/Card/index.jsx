import React from "react";
import "./card.style.scss"
import { cardIconOne } from "../utils";
const Card = ({ item }) => {
  return (
    <div className="card total-Issued">
      <p>{item.title}</p>
      <div className="icon-wrapper">
        <span className="icon-dash">
          {cardIconOne()}
        </span>
        {item.count > 0 ? <span className="count">{item.count}</span> : <span className="count">N/A</span>}
      </div>
    </div>
  );
};

export default Card;
