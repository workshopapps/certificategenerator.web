import React from "react";
import { useNavigate } from "react-router-dom";
import "./BulkStep.style.scss";
import example from "../../../assets/images/example.png";
import one from "../../../assets/images/step-one.png";
import two from "../../../assets/images/step-two.png";
import three from "../../../assets/images/step-three.png";
import Button from "../../../Component/button";

export default function BulkStep() {
  const navigate = useNavigate();
  return (
    <div className="bulk">
      <p className="heading sora">
        Create bulk Certificates in{" "}
        <span className="emphasized">3 easy steps</span>
      </p>
      <div className="bulk-process ">
        <div className="left">
          <img
            src={example}
            alt="bulk-example"
            style={{ cursor: "pointer" }}
            className="example"
          />
        </div>
        <div className="text-left work-sans right">
          <div className="process">
            <img src={one} alt="one" />
            <div>
              <p className="steps">Select certificate template</p>
              <p>
                Begin by filling your details in the form provided.
              </p>
            </div>
          </div>
          <div className="process">
            <img src={two} alt="two" />
            <div>
              <p className="steps">Upload a CSV file</p>
              <p>
                Upload a CSV file and generate your certificates.
              </p>
            </div>
          </div>
          <div className="process">
            <img src={three} alt="three" />
            <div>
              <p className="steps">Generate bulk certificates</p>
              <p>
                Download the certificates in either zip, pdf or png format.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button className="bulk-button " onClick={() => navigate("/signup")}>
        Create Bulk Certificates
      </Button>
    </div>
  );
}
