import React from "react";
import { Link } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-18-pdf/renderer";
import "./singlepreview.style.scss";
//import ".../Style/_variables.scss"
import certificate from "./images/Completion - Portrait (2).png";
import certificate3 from "./images/Completion - Portrait (3).png";
import certificate2 from "./images/Completion - Portrait.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

function Index() {
  return (
    <div id="singlePreview">
      {/* BUTTONS TO TOGGLE BETWEEN SINGLE AND BULK CERTIFICATE */}

      <div className="button-container">
        <Link to="/">
          <button className="active">Single Certificate</button>
        </Link>
        <Link to="/edit_bulk">
          <button className="not-active">Bulk Certificate</button>
        </Link>
      </div>

      {/* IMAGE OF YOUR CERTIFICATE READY TO BE DOWNLOADED OR SENT */}

      <div className="certificate-hero">
        <h1>Your certificate is ready!</h1>
        {/* <img src={certificate} alt="certificate" /> */}
        <PDFViewer style={styles.viewer}>
          {/* Start of the document*/}
          <Document>
            {/*render a single page*/}
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Hello</Text>
              </View>
              <View style={styles.section}>
                <Text>World</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>

        {/* BUTTONS FOR EITHER SENDIMG OR DOWNLOADING */}

        <div className="buttons">
          <button className="send-button">Send Certificate</button>
          <button className="download-button">Download Certificate</button>
        </div>
      </div>

      {/* OTHER TEMPLATES TO CHOOSE FROM */}

      <h2>Even More Templates for you</h2>
      <div className="single-images">
        <img src={certificate} alt="templates" />
        <img src={certificate2} alt="templates" />
        <img src={certificate3} alt="templates" />
      </div>

      {/* BUTTON TO EXPLORE MORE TEMPLATES */}
      <button className="explore-button">Explore More Templates</button>
    </div>
  );
}

export default Index;
