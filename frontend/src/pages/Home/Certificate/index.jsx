import React, { useState } from "react";
import './certificate.style.scss'
import demo from '../../../assets/images/demo.png'
import demo_2 from '../../../assets/images/demo-2.png'
import demo_3 from '../../../assets/images/demo-3.png'
import {Link, useNavigate} from "react-router-dom"
import UploadCSV from "../../UploadCSV";
import SinglePreview from "../../SinglePreview";

export default function Certificate ({
  logo,
  setLogo,
  certificateTitle,
  setCertificateTitle,
  awardeeName,
  setAwardeeName,
  message,
  setMessage,
  issuedBy,
  setIssuedBy,
  issueDate,
  setIssueDate
}) {
    const [bulkCertificate, setBulkCertificate] = useState(false);
  
    return (
        <>
          <p className="sora header">
            Create your <span className="emphasized">certificate </span> 
            with <span className="emphasized">ease</span>
          </p>

          <p style={{padding: '10px'}} className="prompt">Select a template, input values and Create a Certificate right away.</p>

          {bulkCertificate ? 
          <div className="flex justify-between mode">
            <button className="select" style={{color: '#222222', backgroundColor: '#ffffff'}}  onClick={() => {setBulkCertificate(false)}}>Single <span className="mobile-none">Certificate</span></button>
            <button className="select" onClick={() => {setBulkCertificate(true)}}>Bulk <span className="mobile-none">Certificate</span></button>
          </div>
          :
          <div className="flex justify-between mode">
            <button className="select"  onClick={() => {setBulkCertificate(false)}}>Single <span className="mobile-none">Certificate</span></button>
            <button className="select" style={{color: '#222222', backgroundColor: '#ffffff'}} onClick={() => {setBulkCertificate(true)}}>Bulk <span className="mobile-none">Certificate</span></button>
          </div>
        }
          

          {bulkCertificate ?            
           <div>

          <div className="flex center justify-between gap cert-img">
            <img src={demo} alt="certificate-1" />
            <img src={demo_2} alt="certificate-2" />
            <img src={demo_3} alt="certificate-3" />
          </div>

          <Link to="templates">
          <p className="explore"><span className="explore-arrow">&#10140;</span>Explore more templates</p>
          </Link>

          <form data-test-id="cert-form" action="" className="cert-form text-left work-sans">
            <UploadCSV />
            {/* <label for='img'>Logo</label>
            <input type="file" name="uploadfile" id="img" style={{ display:"none"}}/>
            <label for="img" className="upload">Upload logo</label>
            <p style={{fontSize: '12px', margin: '0'}}>Max image upload size: 8mb</p>

            <label for='text' className="label">Certificate Title</label>
            <input type="text" placeholder="Certificate of completion"/>
        
            <label for='text' className="label">Dedication or message</label>
            <input type="text" placeholder="For your exceptional performance this month, 
            in appreciation for your loyalty and the desire to fulfil our goals, 
            in recognition of your leadership and dedication "/>

            <label for='text' className="label">Issued by</label>
            <input type="text" placeholder="Name of organisation or issuer"/>

            <label for='date' className="label">Issue Date</label>
            <input type="date" />

            <input type="submit" value="Create Certificate" className="submit-btn"/> */}
          </form>
           </div>
           : 
           <div>

          <div className="flex center justify-between gap cert-img">
            <img src={demo} alt="certificate-1" />
            <img src={demo_2} alt="certificate-2" />
            <img src={demo_3} alt="certificate-3" />
          </div>

          <Link to="templates">
          <p className="explore"><span className="explore-arrow">&#10140;</span>Explore more templates</p>
          </Link>
          
          <form action="" className="cert-form text-left work-sans">
            <label for='img'>Logo</label>
            <input type="file" name="uploadfile" id="img" style={{ display:"none"}}/>
            <label htmlFor="img" className="upload">Upload logo</label>
            <p style={{fontSize: '12px', margin: '0'}}>Max image upload size: 8mb</p>

            <label htmlFor='text' className="label">Certificate Title</label>
            <input type="text" placeholder="Certificate of completion" value={certificateTitle} onChange={e => setCertificateTitle(e.target.value)} />

            <label htmlFor='text' className="label">Awardee Name</label>
            <input type="text" placeholder="Gabriel Prosper" value={awardeeName} onChange={e => setAwardeeName(e.target.value)} />

            <label htmlFor='text' className="label">Dedication or message</label>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="For your exceptional performance this month, 
                in appreciation for your loyalty and the desire to fulfil our goals, 
                in recognition of your leadership and dedication"
            />

            <label htmlFor='text' className="label">Issued by</label>
            <input type="text" placeholder="Name of organisation or issuer" value={issuedBy} onChange={e => setIssuedBy(e.target.value)} />

            <label htmlFor='date' className="label">Issue Date</label>
            <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} />

            <Link to = "single_preview">
            <input type="submit" value="Create Certificate" className="submit-btn"/>

            </Link>
          </form>
            </div>}
        </>
    )
}