import React from "react";
import './BulkStep.style.scss'
import example from '../../assets/images/example.png'
import one from '../../assets/images/step-one.png'
import two from '../../assets/images/step-two.png'
import three from '../../assets/images/step-three.png'

export default function BulkStep () {
    return (
        <div className="bulk">
          <p className="heading sora">Create bulk Certificates in <span className="emphasized">3 easy steps</span></p>
          <div className="flex space center items-center wrap">
            <img src={example} alt="bulk-example" style={{cursor: 'pointer'}} className="example"/>
            <div className="text-left work-sans">
                <div className="process">
                  <img src={one} alt="one" />
                  <p className="steps">Select certificate template</p>
                </div>
                <div className="process">
                  <img src={two} alt="two" />
                  <p className="steps">Upload a CSV file</p>
                </div>
                <div className="process">
                  <img src={three} alt="three" />
                  <p className="steps">Generate bulk certificates</p>
                </div>
            </div>
          </div>
          <button className="bulk-button work-sans">Create Bulk Certificates</button>
        </div>
    )
}