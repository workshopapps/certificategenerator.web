import React from 'react'
import "./bulkcertdesign.style.scss"

const index = () => {
  return (
    <div>
        {/* START OF CERTIFICATE */}

      <div id="downloadWrapper" >
        <div id="certificateWrapper">
          <div id="container-wrapper">
            <div id="container-design">
                <div className="overlay"></div>
              <div className="sample3"></div>
              <div className="sample"></div>
              <div className='water-mark'>
                <p>Certgo</p>
                <p>Certgo</p>
              </div>
             

              <div id="single-preview-card">
                <div id="single-preview-text">
                  <div id="preview-text">
                    <img  style={{ width: "40px" }} alt="logo" />
                    <h1>certificateTitle</h1>

                    <p>THIS CERTIFIES THAT</p>
                    <h2>awardeeName</h2>
                    <h6>message</h6>
                  </div>

                  <div className="single-preview-issue">
                    <div className="issue-by">
                      <h6>issuedBy</h6>
                      <div className="line"></div>
                      <p>ISSUED BY</p>
                    </div>

                    <div className="issue-by">
                      <h6>issueDate</h6>
                      <div className="line"></div>
                      <p>ISSUE DATE</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sample2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* END OF CERTIFICATE */}
    </div>
  )
}

export default index