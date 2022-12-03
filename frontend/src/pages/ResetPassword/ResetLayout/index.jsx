import React from "react";
import { Link } from "react-router-dom";
import "./reset.style.scss";
import { AiOutlineLeft } from "react-icons/ai";

const Layout = ({ h2, p, element, link, linkto }) => {
  return (
    <div className="resetPassword">
      <section className="textarea">
        <h2>{h2}</h2>
        <p>{p}</p>
      </section>
      <section className="resetContainer">
        {element.map((e, i) => (
          <div className={`actionElement-${i}`}>{e}</div>
        ))}
        {link && (
          <div className="navigateBack">
            <i>
              <AiOutlineLeft />
            </i>
            <Link to={linkto}>{link}</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Layout;
