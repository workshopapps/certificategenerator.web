import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./pricing.style.scss";
import { data } from "./data";
import useAppProvider from "../../hooks/useAppProvider";
import conatctLocatonIconStar from "../../assets/svgs/Conatct-locaton-icon-star.svg";

function Slider() {
  const { access } = useAppProvider();
  const [value, setValue] = useState(0);

  const { per } = data[value];

  const [disabled, setDisabled] = useState(false);

  function disabledHandler(e) {
    e.preventDefault();
    setDisabled(true);
  }

  return (
    <section className="plansContainer" id="slider">
      {data[value].subscription.map(item => {
        const { id, sub } = item;
        return (
          <div className={sub.subType} key={id}>
            {sub.subType === "Standard" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "0.5rem"
                }}
              >
                <h4>{sub.subType}</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#08372F1A"
                  }}
                >
                  <p style={{ fontSize: "12px" }}>Recommended</p>
                  <img
                    style={{ width: "13px" }}
                    src={conatctLocatonIconStar}
                    alt="Conatct-locaton-icon-star"
                  />
                </div>
              </div>
            ) : (
              <h4 style={{ marginBottom: "0.5rem" }}>{sub.subType}</h4>
            )}

            <p>{sub.header}</p>

            <h3 style={{ paddingTop: "0.8rem", paddingBottom: "0.8rem" }}>
              {sub.amount}
              <span>{per}</span>
            </h3>

            <p>{sub.text}</p>

            <article>
              {sub.subText.map(item => {
                const { id, img, txt } = item;
                return (
                  <div className="others" key={id}>
                    <img src={img} alt={txt} />
                    <span>{txt}</span>
                  </div>
                );
              })}
            </article>

            {access ? (
              <Link
                to={`${sub.subType !== "Basic" ? "/payment" : ""}`}
                style={
                  disabled && sub.subType === "Basic"
                    ? {
                        cursor: "not-allowed",
                        backgroundColor: "#8ab9b2",
                        pointerEvents: "none"
                      }
                    : {}
                }
                onClick={e => disabledHandler(e)}
              >
                {sub.linkText}
              </Link>
            ) : (
              <Link to={sub.linkTo}>{sub.linkText}</Link>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default Slider;
