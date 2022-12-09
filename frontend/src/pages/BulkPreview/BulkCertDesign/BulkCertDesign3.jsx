import React from 'react'

import "./templates.scss";
import "./bulkcertdesign.style.scss";

const BulkCertDesign3 = React.forwardRef(({ item }, ref) => {  
  return (
    <div ref={ref}>
      {/* START OF CERTIFICATE */}
      <div id="downloadWrapper">
        <div id ='template3-wrapper'>
          <div id="certificateWrapper3">
            <div id="template3-container">
              <div id="template3-design">
                {/* <div className="water-mark">
                  <p>Certgo</p>
                  <p>Certgo</p>
                </div> */}

                <div id="single-preview-card">
                  <div id="single-preview-text">
                    <div id="preview-text">
                      {/* <img src={logo} style={{ width: "100px" }} alt="logo" /> */}
                      <h1 style = {{color: 'green'}}>{item.award}</h1>

                      <p>THIS CERTIFIES THAT</p>
                      <h2>{item.name}</h2>
                      <h6>{item.description}</h6>
                    </div>

                    <div className="single-preview-issue">
                      <div className="issue-by">
                        <h6>{item.nameOfOrganization}</h6>
                        <div className="line"></div>
                        <p>ISSUED BY</p>
                      </div>

                      <div className="issue-by">
                        <h6>{item.date}</h6>
                        <div className="line"></div>
                        <p>ISSUE DATE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default BulkCertDesign3;
