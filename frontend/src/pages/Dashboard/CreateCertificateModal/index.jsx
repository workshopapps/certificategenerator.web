import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCSV } from "../../";
import "./createmodal.style.scss";
 
function CreateCertificateModal({ open, onClose,
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
  const [tab, setTab] = useState(false)
  const navigate = useNavigate()
  const disabledButton = !logo.trim() || !message.trim() || !certificateTitle.trim() || !awardeeName.trim() || !issuedBy.trim() || !issueDate.trim()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/single_preview')
  }
  if (!open) return null;
  return (
    <div onClick={onClose} className="modal-wrap">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="cancel-btn-wrapper">
          <button onClick={onClose} className="modal-container__cancel">
            <span className="cancel-x-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>


        <div className="modal-body">
          <div className="head">
            <h3>Create your <span className="text-green">certificate</span> with <span className="text-green">ease</span></h3>
            <p>Select a template, input values and Create a Certificate right away.</p>
            
            {tab ? 
            <div className="flex justify-between mode w-5">
              <button className="select" style={{color: '#222222', backgroundColor: '#ffffff'}}  onClick={() => {setTab(false)}}>Single <span className="mobile-none">Certificate</span></button>
              <button className="select" onClick={() => {setTab(true)}}>Bulk <span className="mobile-none">Certificate</span></button>
            </div>
            :
            <div className="flex justify-between mode w-5">
              <button className="select"  onClick={() => {setTab(false)}}>Single <span className="mobile-none">Certificate</span></button>
              <button className="select" style={{color: '#222222', backgroundColor: '#ffffff'}} onClick={() => {setTab(true)}}>Bulk <span className="mobile-none">Certificate</span></button>
            </div>}
          </div>
          <br/>
          <br/>
          <br/>
          
          {tab ? 
          <div>
            <UploadCSV/>
          </div>
           : 
           <form onSubmit={handleSubmit}>
            <div>
              <span className="label">Logo</span>
              <label htmlFor="uploadfile">Upload logo <input type="file" id="uploadfile" className="file-type"  onChange={e => setLogo(URL.createObjectURL(e.target.files[0]))} /></label>
              <img src={logo} alt="logo" />
              <span>Max image upload size: 8mb</span>
            </div>
            <div>
              <label htmlFor="logo">Certificate title</label>
              <input type="text" name="logo" placeholder="Certificate of Completion" value={certificateTitle} onChange={e => setCertificateTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="logo">Awardee name</label>
              <input type="text" name="logo" placeholder="Gabriel prosper"  value={awardeeName} onChange={e => setAwardeeName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="logo">Dedication or Message</label>
              <input type="text" name="logo" placeholder="For your exceptional performance this month, in appreciation for your loyalty and the desire to fulfil our goals."  value={message} onChange={e => setMessage(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="logo">Issued by</label>
              <input type="text" name="logo" placeholder="Name of organisation or issuer"  value={issuedBy} onChange={e => setIssuedBy(e.target.value)} />
            </div>
            <div>
              <label htmlFor="logo">Issue Date</label>
              <input type="text" name="logo" placeholder="DD/MM/YY"  value={issueDate} onChange={e => setIssueDate(e.target.value)}/>
            </div>
              <div>
              <button disabled={disabledButton} className={`${disabledButton && 'btn-disabled'} btn-success`}>Create Certificate</button>
              </div>
          </form>
          }
        </div>
        


      </div>
    </div>
  );
}

export default CreateCertificateModal;
