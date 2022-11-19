import React from "react";
import {Link} from "react-router-dom"
import './certificate.style.scss'
import demo from '../../assets/images/demo.png'
import demo_2 from '../../assets/images/demo-2.png'
import demo_3 from '../../assets/images/demo-3.png'

export default function Certificate () {
    return (
        <>
          <p className="sora header">
            Create your <span className="emphasized">certificate </span> 
            with <span className="emphasized">ease</span>
          </p>

          <p style={{padding: '10px'}}>Select a template, input values and Create a Certificate right away.</p>

          <div className="flex justify-between mode">
            <button className="select" >Single Certificate</button>
            <button className="select" style={{color: '#222222', backgroundColor: '#ffffff'}}>Bulk Certificate</button>
          </div>

          <div className="flex center justify-between gap cert-img">
            <img src={demo} alt="certificate-1" />
            <img src={demo_2} alt="certificate-2" />
            <img src={demo_3} alt="certificate-3" />
          </div>

          <form action="" className="form text-left work-sans">
            <label htmlFor='img'>Logo</label>
            <input type="file" name="uploadfile" id="img" style={{ display:"none"}}/>
            <label htmlFor="img" className="upload">Upload logo</label>
            <p style={{fontSize: '12px'}}>Max image upload size: 8mb</p>

            <label htmlFor='text' className="label">Certificate Title</label>
            <input type="text" placeholder="Certificate of completion"/>

            <label htmlFor='text' className="label">Awardee Names</label>
            <input type="text" placeholder="Gabriel Prosper"/>

            <label htmlFor='text' className="label">Dedication or message</label>
            <input type="text" placeholder="htmlFor your exceptional performance this month, 
            in appreciation for your loyalty and the desire to fulfil our goals, 
            in recognition of your leadership and dedication "/>

            <label htmlFor='text' className="label">Issued by</label>
            <input type="text" placeholder="Name of organisation or issuer"/>

            <label htmlFor='date' className="label">Issue Date</label>
            <input type="date" />

          <Link to = "single_preview">
          <input type="submit" value="Create Certificate" className="submit-btn"/>
          </Link>
          </form>
        </>
    )
}