import React, {useState} from 'react';
import './preview.scss';
import UploadCSV from '../UploadCSV';
import SinglePreview from '../SinglePreview';
import { AppProvider } from '../../contexts/AppProvider';

export default function Preview({  
  logo,
  certificateTitle,
  awardeeName,
  message,
  issuedBy,
  issueDate }) {

  const [bulkCertificate, setBulkCertificate] = useState(false);

    return (
        <div id='preview'>
          {bulkCertificate ? 
          <div className="flex justify-between mode">
            <button className="select" style={{color: '#222222', backgroundColor: '#ffffff', transition: '300ms ease-in'}}  onClick={() => {setBulkCertificate(false)}}>Single <span className="mobile-none">Certificate</span></button>
            <button className="select" onClick={() => {setBulkCertificate(true)}}>Bulk <span className="mobile-none">Certificate</span></button>
          </div>
          :
          <div className="flex justify-between mode">
            <button className="select"  onClick={() => {setBulkCertificate(false)}}>Single <span className="mobile-none">Certificate</span></button>
            <button className="select" style={{color: '#222222', backgroundColor: '#ffffff', transition: '300ms ease-in'}} onClick={() => {setBulkCertificate(true)}}>Bulk <span className="mobile-none">Certificate</span></button>
          </div>
        }
          {bulkCertificate ?  (
            <AppProvider>
              <UploadCSV />
            </AppProvider>
          ) : 
           
             <SinglePreview   
              logo={logo}
              message={message}
              issuedBy={issuedBy}
              issueDate={issueDate}
              awardeeName={awardeeName}
              certificateTitle={certificateTitle}/>
        }
     </div>
    )
}