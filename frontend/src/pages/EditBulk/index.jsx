import React from "react";
import { Link } from "react-router-dom";
import "./edit.style.scss";

function Index() {

  return (
    <div id="edit-bulk">
      {/* BUTTONS TO TOGGLE BETWEEN SINGLE AND BULK CERTIFICATE */}

      <div className="button-container">
        {/* BUTTON TO GO BACK TO THE SINGLE CERTIFICATE PAGE */}

        <Link to="/single_preview">
          <button className="not-active">Single Certificate</button>
        </Link>

        <Link to="/edit_bulk">
          <button className="active">Bulk certificate</button>
        </Link>
      </div>

      {/* FORM TO FILL TO MODIFY YOUR SINGLE CERTIFICATE TO BULK CERTIFICATES */}

      <div className="modify-container">
        <h1>Modify Certificate</h1>

        <form action="#">
          <div id="edit-bulk-logo">
            <label htmlFor="Logo">Logo</label>
            <br /> <input placeholder="Upload Logo" type="file"  required />
            <h6>Max image upload size: 8mb</h6>
          </div>

          <div className="edit-bulk-select">
            <label htmlFor="Certificate Title">Certificate Title</label>
            <select
            required
              name="Certificate of completion"
              id="Certificate of completion"
            >
              <option value="Certificate of completion">
                Certificate of Completion
              </option>
              <option value="Certificate of achievement">
                Certificate of Achievement
              </option>
              <option value="Certificate of appreciation">
                Certificate of Appreciation
              </option>
              <option value="employee of the year">
                Employee of the Year
              </option>
              <option value="employee of the month">
                Employee of the Month
              </option>
              <option value="employee of the week">
                Employee of the Week
              </option>
              <option value="custom certificate">
                Custom Certificate 
              </option>
            </select>
          </div>

          <div className="edit-bulk-input">
            <label htmlFor="Dedication or Message">Dedication or Message</label>
            <input
              placeholder="For your exceptional performance this month, in appreciation for your loyalty and the desire to fulfil our goals,
               in recognition of your leadership and dedication"
              type="text"
              required
            />
          </div>

          <div className="edit-bulk-input">
            <label htmlFor="Issued by">Issued by</label>
            <input  placeholder="Name of organization or issuer" type="text"  required  />
         
          </div>

          <div className="edit-bulk-input">
            <label htmlFor="Issue Date">Issue Date</label>
            <input placeholder="DD/MM/YY" type="text"  required  />
          </div>

          {/* CREATE BUTTON FOR BULK CERTIFICATES */}
          {/* PROCEED TO BULK PREVIEW PAGE */}
          
          <Link to = "/bulk_preview">
          <button id="edit-bulk-button">Create Certificate</button>
        </Link>
      
        </form>
      </div>
    </div>
  );
}

export default Index;
