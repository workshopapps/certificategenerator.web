import React, { useState } from "react";

import cardimg from "./assets/Rectangle1.png";
import cardimg2 from "./assets/Rectangle2.png";
import cardimg3 from "./assets/Rectangle3.png";
import cardimg4 from "./assets/Rectangle4.png";
import cardimg5 from "./assets/Rectangle5.png";
import cardimg6 from "./assets/Rectangle6.png";
import cardimg7 from "./assets/Rectangle7.png";
import cardimg8 from "./assets/Rectangle8.png";
import cardimg9 from "./assets/Rectangle9.png";
import cardimg10 from "./assets/Rectangle10.png";
import cardimg11 from "./assets/Rectangle11.png";
import premiumicon from "./assets/Vector.svg";
import filtericon from "./assets/setting.svg";
import addicon from "./assets/add-square.svg";
import "./template.style.scss";

export default function Template() {
  const [modalState, setmModalState] = useState("false");

  return (
    <div className="template-wrapper">
      <header>
        <h1>Templates</h1>
        <p>All results</p>
        <button className="filter-btn">
          Filters{" "}
          <span>
            <img src={filtericon} alt="" />
          </span>
        </button>
      </header>
      <div className="cards-container">
        {/* cards start */}
        <div className="template-card">
          <div className="template-card__header">
            <h2>Blank Canvas</h2>
            <button>
              Premium
              <img src={premiumicon} alt="" />
            </button>
          </div>
          <div className="template-card__icon">
            <a href="#">
              <img src={addicon} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg2} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg3} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg4} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg5} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg6} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg7} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg8} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg9} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg10} alt="card" />
            </a>
          </div>
        </div>

        <div className="template-card">
          <div className="template-card__img">
            <a href="#">
              <img src={cardimg11} alt="card" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
