import jsPDF from "jspdf";
import { toPng } from "html-to-image";
// import ReactToPrint from "react-to-print";
import * as htmlToImage from "html-to-image";
import React, { useRef, useCallback, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "./bulk.style.scss";
import "@splidejs/react-splide/css";
import Button from "../../Component/button";
import BulkCertDesign1 from "./BulkCertDesign/BulkCertDesign1";
import BulkCertDesign2 from "./BulkCertDesign/BulkCertDesign2";
import BulkCertDesign3 from "./BulkCertDesign/BulkCertDesign3";
import certificate2 from "../../assets/images/bulkPreview/template_two.png";
import certificate3 from "../../assets/images/bulkPreview/template_three.png";
import certificate from "../../assets/images/bulkPreview/Completion - Portrait (2).png";

function Index() {
  const [loading, setLoading] = useState(false);
  // Getting the file data from the local storage and parsing its values
  const savedData = localStorage.getItem("dataKey");
  const array = JSON.parse(savedData);

  //STATES FOR TEMPLATES
  const [templateone, setTemplateOne] = useState(true);
  const [templatetwo, setTemplateTwo] = useState(false);
  const [templatethree, setTemplateThree] = useState(false);

  //FUNCTIONS TO HANDLE TEMPLATES

  const handleTemplate1 = () => {
    setTemplateOne(true);
    setTemplateTwo(false);
    setTemplateThree(false);
  };
  const handleTemplate2 = () => {
    setTemplateTwo(true);
    setTemplateOne(false);
    setTemplateThree(false);
  };
  const handleTemplate3 = () => {
    setTemplateThree(true);
    setTemplateOne(false);
    setTemplateTwo(false);
  };

  const bulkCertDesignRef = useRef();

  const handleClick = useCallback(() => {
    setLoading(true);
    if (bulkCertDesignRef.current === null) {
      setLoading(false);
      return;
    }
    toPng(bulkCertDesignRef.current, {
      cacheBust: true,
      backgroundColor: "#f8fffe",
      canvasWidth: 388.5,
      canvasHeight: 299.4
    })
      .then(dataUrl => {
        setLoading(false);
        const link = document.createElement("a");
        link.download = "certgo.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [bulkCertDesignRef]);

  const downloadMultiplePdfs = async () => {
    const doc = new jsPDF("p", "px", [339.4, 339.4]); // Initialize a new jsPDF instance
    const elements = document.getElementsByClassName("multiple"); // Get all certificates as HTML Elements
    setLoading(true);
    await createPdf({ doc, elements });
    setLoading(false);
    doc.save(`certgo.pdf`); // Download generated pdf doc using jspdf's save() method
  };

  const createPdf = async ({ doc, elements }) => {
    const padding = 10;
    const marginTop = 20;
    let top = marginTop;

    for (let i = 0; i < elements.length; i++) {
      const el = elements.item(i);
      // Convert each HTML Element with certificate into image (with htmlToImage library)
      const imgData = await htmlToImage.toPng(el);

      let elHeight = el.offsetHeight;
      let elWidth = el.offsetWidth;
  
      const pageWidth = doc.internal.pageSize.getWidth();
  
      if (elWidth > pageWidth) {
        const ratio = pageWidth / elWidth;
        elHeight = elHeight * ratio - padding * 2;
        elWidth = elWidth * ratio - padding * 2;
      }

      const pageHeight = doc.internal.pageSize.getHeight();

      // As we are adding multiple certificates, create a new pdf page when needed
      if (top + elHeight > pageHeight) {
        doc.addPage();
        top = marginTop;
      }
      
      // Add converted certificate image to the pdf doc with jsPDF's addImage() method
      doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`); 
      top += elHeight + marginTop;
    }
  };

  return (
    <div id="bulk-preview">
      {/* PREVIEW OF BULK GENERATED CERTIFICATES  */}
      <h2>Preview of Generated Certificates</h2>
      <section id="bulk-images-desktop">
        <Splide
          className="bulk-images-wrapper"
          options={{
            rewind: true,
            gap: "30px",
            perPage: 3,
            drag: "free",
            arrows: true,
            pagination: true,
            breakpoints: {
              640: {
                perPage: 1
              },
              798: {
                perPage: 2
              }
            }
          }}
        >
          {/* Mapping through the data */}
          {array.map((item, id) => (
            <SplideSlide key={id}>
              {templateone && (
                <BulkCertDesign1 item={item} ref={bulkCertDesignRef} />
              )}
              {templatetwo && (
                <BulkCertDesign2 item={item} ref={bulkCertDesignRef} />
              )}
              {templatethree && (
                <BulkCertDesign3 item={item} ref={bulkCertDesignRef} />
              )}
            </SplideSlide>
          ))}
        </Splide>
      </section>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}
      <div id="bulk-btns">
        <div className="dropdown">
          {loading ? (
            <div>
              <Button name="Files downloading..." style={{ padding: "10px" }} />
            </div>
          ) : (
            <Button name="Download Certificates" style={{ padding: "10px" }} />
          )}
          <div className="dropdown-content" style={{ marginTop: "0px" }}>
            {/* <ReactToPrint
              content={() => bulkCertDesignRef.current}
              trigger={() => <Button name="PDF" style={{ padding: "10px", width: "120px" }} className="bulk_dropdown" />}
            /> */}
            <Button
              name="PDF"
              style={{ padding: "10px", width: "120px" }}
              onClick={downloadMultiplePdfs}
              className="bulk_dropdown"
            />
            <Button
              name="PNG"
              style={{ padding: "10px", width: "120px" }}
              onClick={handleClick}
              className="bulk_dropdown"
            />
          </div>
        </div>
        {/* <Button name="Download Certificates as PDF" style={{ padding: "10px" }} /> */}
        {/* <Button
          className="btnLight"
          name="Send Certificates"
          style={{ padding: "10px" }}
        /> */}
      </div>

      {/* OTHER TEMPLATES TO CHOOSE FROM */}
      <h2>Even More Templates for you</h2>
      <div className="single-images" style={{ marginBottom: "50px" }}>
        <img onClick={handleTemplate1} src={certificate} alt="templates" />
        <img onClick={handleTemplate2} src={certificate2} alt="templates" />
        <img onClick={handleTemplate3} src={certificate3} alt="templates" />
      </div>
    </div>
  );
}

export default Index;
