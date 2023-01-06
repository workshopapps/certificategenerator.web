import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./pricing.style.scss";
import Slider from "./slider";
import { data } from "./data";
import Feature from "./feature";
import "@splidejs/react-splide/css";
import useAppProvider from "../../hooks/useAppProvider";
import conatctLocatonIconStar from "../../assets/svgs/Conatct-locaton-icon-star.svg";

function Pricing({ amountHandler }) {
  const { access } = useAppProvider();
  const [value, setValue] = useState(0);

  const { per } = data[value];

  const [disabled, setDisabled] = useState(false);

  function disabledHandler(
    e,
    subType,
    subAmount,
    subPer,
    subHeader,
    subText,
    subSubText
  ) {
    if (subType === "Basic") {
      e.preventDefault();
    }
    amountHandler(subType, subAmount, subPer, subHeader, subText, subSubText);
    setDisabled(true);
  }

  return (
    <main>
      <section className="pricing">
        <article className="text">
          <p>PRICING</p>

          <h3>We've got a plan to suit any need.</h3>

          <p>
            Buy a plan that's right for you. With Certgo you can tailor your
            plan to suit your budget and needs. We accept all major payment
            methods and process payments immediately.
          </p>
        </article>

        <article className="plans">
          <div className="btnContainer">
            {data.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setValue(index);
                  }}
                  className={`plan-btn ${index === value && "active-btn"}`}
                >
                  {item.plan}
                </div>
              );
            })}
          </div>

          <div className="plansContainer" id="pc">
            {data[value].subscription.map(item => {
              const { id, sub } = item;
              return (
                <div className={sub.subType} key={id}>
                  {sub.subType === "Standard" ? (
                    <div
                      style={{
                        gap: "16px",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem"
                      }}
                    >
                      <h4>{sub.subType}</h4>
                      <div
                        style={{
                          gap: "6px",
                          display: "flex",
                          padding: "6px 16px",
                          borderRadius: "12px",
                          alignItems: "center",
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
                      style={sub.subType === "Basic" ? { display: "none" } : {}}
                      onClick={e =>
                        disabledHandler(
                          e,
                          sub.subType,
                          sub.amount,
                          per,
                          sub.header,
                          sub.text,
                          sub.subText
                        )
                      }
                    >
                      {sub.linkText}
                    </Link>
                  ) : (
                    <Link to={sub.linkTo}>{sub.linkText}</Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sliderContainer">
            <Slider
              per={per}
              value={value}
              access={access}
              disabledHandler={disabledHandler}
            />
          </div>
        </article>
      </section>

      <Feature />
    </main>
  );
}

export default Pricing;
