import { toPng } from "html-to-image";
import ReactToPrint from "react-to-print";
import React, { useRef, useCallback } from "react";

import "./bulk.style.scss";
import "@splidejs/react-splide/css";
import Button from "../../Component/button";
import BulkCertDesign from "./BulkCertDesign";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Index() {
  // Getting the file data from the local storage and parsing its values
  const savedData = localStorage.getItem("dataKey");
  const array = JSON.parse(savedData);

  const bulkCertDesignRef = useRef();

  const handleClick = useCallback(() => {
    if (bulkCertDesignRef.current === null) {
      return;
    };
    toPng(bulkCertDesignRef.current, { cacheBust: true, backgroundColor: "#f8fffe", canvasWidth: 388.5, canvasHeight: 299.4 })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'certgo.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err)
      })
  }, [bulkCertDesignRef]);

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
              <BulkCertDesign
                item={item}
                ref={bulkCertDesignRef}
              />
            </SplideSlide>
          ))}
        </Splide>
      </section>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}
      <div id="bulk-btns">
        <ReactToPrint
          content={() => bulkCertDesignRef.current}
          trigger={() => <Button name="Download Certificates as PDF" style={{ padding: "10px" }} />}
        />
        <Button name="Download Certificates as PNG" style={{ padding: "10px" }} onClick={handleClick} />
        {/* <Button name="Download Certificates as PDF" style={{ padding: "10px" }} /> */}
        <Button
          className="btnLight"
          name="Send Certificates"
          style={{ padding: "10px" }}
        />
      </div>
    </div>
  );
}

export default Index;
