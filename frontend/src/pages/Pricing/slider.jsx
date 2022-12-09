import React from "react";
import { Link } from "react-router-dom";

import "./pricing.style.scss";
import { data } from "./data";

function Slider({ value }) {
  const { per } = data[value];

  return (
    <section className="plansContainer" id="slider">
      {data[value].subscription.map(item => {
        const { id, sub } = item;

        return (
          <article className={sub.subType} key={id}>
            <h4>{sub.subType}</h4>

            <p>{sub.header}</p>

            <h3>
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

            <Link to={sub.linkTo}>{sub.linkText}</Link>
          </article>
        );
      })}
    </section>
  );
}

export default Slider;
