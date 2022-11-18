import "./error.style.scss";
import { BsArrowLeft } from "react-icons/bs";
import errorImg from "./assets/page-not-found.png";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="error-page">
      <h1>We lost this page</h1>
      <p>
        We couldn't find what you are looking for. Let's find a better place for
        you to go.
      </p>
      <div className="error-buttons">
        <button className="btn-solid">
          <Link className="link" to="/">
            Go to Certawi Home
          </Link>
        </button>
        <button className="btn-outline">
          <Link className="link">
            <BsArrowLeft className="arrow-left" />
            Go Back
          </Link>
        </button>
      </div>
      <div className="error-image">
        <img src={errorImg} alt="error 404" />
      </div>
    </div>
  );
};

export default index;
