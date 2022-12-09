import Logo2 from '../icons/Logo 2.svg'
import Instagram from '../icons/Instagram.svg'
import Linkedin from '../icons/Linkedin.svg'
import Twitter from '../icons/Twitter.svg'
import Github from '../icons/Github.svg'

function Footer() {
  return (
    <div className="container-fluid" id='Footer-main-container'>

        <div className="row" id='Footer-row'>

          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2" id='Footer-row-col-1'>
            <ul id='Footer-list'>
              <li id='Footer-list-comp-active'>Company</li>
              <li id='Footer-list-comp'>About</li>
              <li id='Footer-list-comp'>Contact</li>
              <li id='Footer-list-comp'>Our team</li>
            </ul>
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2" id='Footer-row-col-2'>
            <ul id='Footer-list'>
              <li id='Footer-list-comp-active'>Product</li>
              <li id='Footer-list-comp'>How it works</li>
              <li id='Footer-list-comp'>Pricing</li>
              <li id='Footer-list-comp'>Terms of Service</li>
              <li id='Footer-list-comp'>Privacy Policy</li>
            </ul>
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2" id='Footer-row-col-3'>
            <ul id='Footer-list'>
              <li id='Footer-list-comp-active'>Resources</li>
              <li id='Footer-list-comp'>Blog</li>
              <li id='Footer-list-comp'>Help</li>
              <li id='Footer-list-comp'>FAQs</li>
            </ul>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" id='Footer-row-col-4'>
            <h5 id='Footer-row-col-4-text'>Stay up to date with our Product</h5>
            <div className='row' id='Footer-row-col-4-div'>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" id='Footer-row-col-4-div-col'>
                <input type="text" placeholder='Your Email' id='Footer-row-col-4-input' />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4" id='Footer-row-col-4-div-col'>
                <button id='Footer-row-col-4-btn'>Subscribe</button>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2" id='Footer-row-col-5'>
            <img src={Logo2} alt="Logo2" />
            <h5 id='Footer-row-col-5-text'>Info@certgo.com</h5>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2" id='Footer-row-col-6'>
           <h5 id='Footer-row-col-6-text'>We are social</h5>
           <div>
              <img src={Instagram} alt="Instagram" />
              <img src={Linkedin} alt="Linkedin" id='Footer-row-col-6-icon' />
              <img src={Twitter} alt="Twitter" id='Footer-row-col-6-icon' />
              <img src={Github} alt="Github" id='Footer-row-col-6-icon' />
           </div>
          </div>

        </div>

        <h4 id='Footer-main-text'>© Copyright 2022 <span id='Footer-sub-text'>Team Headlight.</span> All rights reserved.</h4>
        
    </div>
  )
}

export default Footer
