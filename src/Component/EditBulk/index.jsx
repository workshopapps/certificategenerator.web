import React from "react";
import { Link } from "react-router-dom";
import "./edit.style.scss";

function Index() {
  return (
    <div>
      {/* BUTTONS TO TOGGLE BETWEEN SINGLE AND BULK CERTIFICATE */}

      <div className="button-container">
        {/* BUTTON TO GO BACK TO THE SINGLE CERTIFICATE PAGE */}

        <Link to="/single_preview">
          <button className="not-active">Single Certificate</button>
        </Link>

        <Link to="/edit_bulk">
          <button className="active">Bulk Certificate</button>
        </Link>
      </div>

      {/* FORM TO FILL TO MODIFY YOUR SINGLE CERTIFICATE TO BULK CERTIFICATES */}

      <div className="modify-container">
        <h1>Modify Certificate</h1>

        <form action="">
          <div className="logo">
            <label htmlFor="Logo">Logo</label>
            <br /> <input placeholder="Upload Logo" type="file" />
            <h6>Max image upload size: 8mb</h6>
          </div>

          <div>
            <label htmlFor="Certificate Title">Certificate Title</label>
            <select
              name="Certificate of completion"
              id="Certificate of completion"
            >
              <option value="Certificate of completion">
                Certificate of completion
              </option>
              <option value="Certificate of completion">
                Certificate of completion
              </option>
              <option value="Certificate of completion">
                Certificate of completion
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="Dedication or Message">Dedication or Message</label>
            <input
              placeholder="For your exceptional performance this month, in appreciation for your loyalty and the desire to fulfil our goals,
               in recognition of your leadership and dedication"
              type="text"
            />
          </div>

          <div>
            <label htmlFor="Issued by">Issued by</label>
            <input placeholder="Name of organization or issuer" type="text" />
          </div>

          <div>
            <label htmlFor="Issue Date">Issue Date</label>
            <input placeholder="DD/MM/YY" type="text" />
          </div>

          {/* CREATE BUTTON FOR BULK CERTIFICATES */}
          {/* PROCEED TO BULK PREVIEW PAGE */}

          <Link to="/bulk_preview">
            <button>Create Certificate</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Index;
