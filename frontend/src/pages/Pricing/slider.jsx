import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "./pricing.style.scss";
import { data } from "./data";
// import useAppProvider from "../../hooks/useAppProvider";
import { BsArrowRightShort } from "react-icons/bs";
import conatctLocatonIconStar from "../../assets/svgs/Conatct-locaton-icon-star.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Slider({ value, disabledHandler, per, access }) {
  // const { access } = useAppProvider();
  // const [value, setValue] = useState(0);

  // const { per } = data[value];

  // const [disabled, setDisabled] = useState(false);
  // const x = document.querySelector(".ele_in_div").positionedOffset();
  // const scrollEle = useRef(0);
  function sliderScroll() {
    console.log("udif");
    // console.log(scrollEle);
    // console.log(scrollEle.current);
    // scrollEle.current.scrollTo(0, 50);
    // x.scrollTop = "100px";
    // x.scrollLeft = 100;
    // x.scrollTo(100);
  }
  return (
    <section className="plansContainer" id="slider">
      {/* <div
        style={{
          position: "fixed",
          zIndex: "1",
          top: "50%",
          right: "8%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          padding: "0.4rem",
          borderRadius: "50%",
          boxShadow: "#80808045 2px 2px 18p",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="mobile-arrow"
        onClick={sliderScroll}
      >
        <BsArrowRightShort size={30} />
      </div> */}
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
    </section>
  );
}

export default Slider;
