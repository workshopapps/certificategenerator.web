import React from "react";

import "./bulkcertdesign.style.scss";

const BulkCertDesign1 = React.forwardRef(({ item }, ref) => {
  // const getPageMargins = () => {
  //   return `@page { margin: "0px" !important; }`;
  // };

  return (
    <div ref={ref}>
      {/* START OF CERTIFICATE */}
      <div id="downloadWrapper" className="multiple">
        <div id="certificateWrapper">
          {item.award === undefined ? null : (
            <div id="container-wrapper">
              <div id="container-design">
                {/* <div className="overlay"></div> */}
                <div className="sample3"></div>
                <div className="sample"></div>
                {/* <div className="water-mark">
                  <p>Certgo</p>
                  <p>Certgo</p>
                </div> */}

                <div id="single-preview-card" style={{ marginTop: "40px" }}>
                  <div id="single-preview-text">
                    <div id="preview-text">
                      <h1>{item.award}</h1>
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
          )}
        </div>
      </div>
      {/* END OF CERTIFICATE */}

      {/* <style>{getPageMargins()}</style> */}
    </div>
  );
});

export default BulkCertDesign1;
