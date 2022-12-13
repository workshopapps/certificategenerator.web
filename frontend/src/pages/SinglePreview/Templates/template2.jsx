import React from 'react'
import "./templates.scss";



function Template2({
    logo,
    certificateTitle,
    awardeeName,
    message,
    issuedBy,
    issueDate}) {



        
    return (
        <div id ='template2-wrapper'>
         <div id="certificateWrapper2">
          <div id="template2-container">
            <div id="template2-design">
            
            <div id="single-preview-card" style = {{position : 'relative', top : '20%'}}>
              <div id="single-preview-text">
                <div id="preview-text" style = {{position : 'relative', top : '-10%'}}>
                 
                    <img src={logo} style={{ width: "100px" }} alt="logo" />
                    <h1 style = {{color: '#19acbe'}}>{certificateTitle}</h1>

                    <p>THIS CERTIFICATE IS AWARDED TO</p>
                    <h2>{awardeeName}</h2>
                    <h6>{message}</h6>
                  </div>

                  <div className="single-preview-issue">
                    <div className="issue-by">
                      <h6>{issuedBy}</h6>
                      <div className="line"></div>
                      <p>ISSUED BY</p>
                    </div>

                    <div className="issue-by">
                      <h6>{issueDate}</h6>
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
    )
}

export default Template2
