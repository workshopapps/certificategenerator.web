import React from 'react'

import "./templates.scss";
import "./bulkcertdesign.style.scss";

const BulkCertDesign2 = React.forwardRef(({ item }, ref) => {        
  return (
    <div ref={ref}>
      {/* START OF CERTIFICATE */}
      <div id="downloadWrapper" className='multiple'>
        <div id ='template2-wrapper'>
          <div id="certificateWrapper2">
            <div id="template2-container">
              <div id="template2-design">
                {/* <div className="water-mark">
                  <p>Certgo</p>
                  <p>Certgo</p>
                </div> */}
              
                <div id="single-preview-card" style = {{position : 'relative', top : '20%'}}>
                <div id="single-preview-text">
                  <div id="preview-text" style = {{position : 'relative', top : '-10%'}}>
                    
                      {/* <img src={logo} style={{ width: "100px" }} alt="logo" /> */}
                      <h1 style = {{color: '#19acbe'}}>{item.award}</h1>

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
                {/* <div className="sample2"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default BulkCertDesign2;
