// import { Outlet } from 'react-router-dom'
import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import "./aboutUs.style.scss";

import IMG1 from '../../assets/IMG1.png'

import Value1 from '../../assets/value1.png'
import Value2 from '../../assets/value2.png'
import Value3 from '../../assets/value3.png'

import Service1 from '../../assets/service1.png'
import Service2 from '../../assets/service2.png'
import Service3 from '../../assets/service3.png'
import Service4 from '../../assets/service4.png'

import Gallery1 from '../../assets/gallery1.png'
import Gallery2 from '../../assets/gallery2.png'
import Gallery3 from '../../assets/gallery3.png'
import Gallery4 from '../../assets/gallery4.png'
import Gallery5 from '../../assets/gallery5.png'
import Gallery6 from '../../assets/gallery6.png'


const aboutUs = () => {
  return (
    <div className="about">
      <div className="aboutNav">
        nav
      </div>
      
      <div className="aboutHero">
        <div className="aboutHeroL">
          <h1>We are a team of Creators and Innovators </h1>
          <h4>Certawi helps you generate certificates of different shapes and colors, you can also customize your own certificate with certawi</h4>
          <Link className="btn">Learn More</Link>
        </div>
        <div className="aboutHeroR">
          <img src={IMG1} alt=""/>
        </div>
      </div>

      <div className="aboutAbout">
        <div className="aboutAboutImg">
          <img src={Gallery1} alt="" />
        </div>
        <div className="aboutAboutD">
          <h3>About Certawi</h3>
          <h4>Certawi is a full-featured online platform aimed at generating digital credentials and certificates for schools, businesses and organizations. We offer a complete and easy to use certificate management system. Certawi provides high quality templates with great designs as well as variety of customization options. Generate stunning certificates for your students, employees or colleagues with our online tool, today.</h4>
          <Link className="btn">Learn More</Link>
        </div>
      </div>
      
      <div className="aboutValue">
        <h2>Testiomonial</h2>
        <h4 id="vh4">What our customers have to say about us</h4>
        <div className="aboutValueS">
          <div  className="aboutValueCard">
            <h4 id="v1h4">“I needed it for a bulk generation of my student’s certificate, and it worked quite well. It is easy to use and I was able to create certificate for my students within minutes”.</h4>
            <div className="aboutValueCardD">
              <img src={Value1} alt=""/>
              <div className="aboutValueCardT">
                <h4 id="v2h4" >Ajayi Lawal</h4>
                <h6>Lecturer</h6>
              </div>
            </div>
          </div>
          <div  className="aboutValueCard">
            <h4 id="v1h4">“On opening the website there are different aesthetically pleasing templates made available where I get to choose the one that works for me. This gives me full control so I can easily change certificate content. I recommed for anyone”.</h4>
            <div className="aboutValueCardD">
              <img src={Value2} alt=""/>
              <div className="aboutValueCardT">
                <h4 id="v2h4" >Lucy Lewi</h4>
                <h6>Design mentor</h6>
              </div>
            </div>
          </div>
          <div  className="aboutValueCard">
            <h4 id="v1h4">“Passion is the foundation of our business. It gives us the momentum to keep going even when times gets hard to build our company even higher when times are good”.</h4>
            <div className="aboutValueCardD">
              <img src={Value3} alt=""/>
              <div className="aboutValueCardT">
                <h4 id="v2h4">Ryan Levi</h4>
                <h6>Company Manager</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="aboutService">
          <h3>Our Services</h3>
          <hr className='stroke' />
          <div className="aboutServiceS">
            <div className="aboutServiceCard">
                <img src={Service1} alt="" />
                <div className="aboutServiceCardT">
                  <h4>Preview</h4>
                  <h5>We provide you with access to preview your certificate before downloading</h5>
                </div>
            </div>
            <div className="aboutServiceCard">
                <img src={Service2} alt="" />
                <div className="aboutServiceCardT">
                  <h4>Customize Options</h4>
                  <h5>If your certificate needs to be branded, we provide a variety of fonts and colors of your choice</h5>
                </div>
            </div>
            <div className="aboutServiceCard">
                <img src={Service3} alt="" />
                <div className="aboutServiceCardT">
                  <h4>Bulk generation</h4>
                  <h5>We provide you access to generate over hundred certificates at a go just by entering the file name containing the CSV file</h5>
                </div>
            </div>
            <div className="aboutServiceCard">
                <img src={Service4} alt="" />
                <div className="aboutServiceCardT">
                  <h4>Instant Free Download</h4>
                  <h5>We offer a free way to quickly create and download wherever you are.</h5>
                </div>
            </div>
          </div>
          {/* <Link className="btn">Learn More</Link> */}
        </div>

        <div id="mission" className="aboutAbout">
        <div className="aboutAboutD">
          <h3>Misssion</h3>
          <h4>We strive to offer customers a quick and user friendly digital certificate generation process. Our aim is to provide a single trustworthy and efficient online certificate maker tool. Or team of highly trained professionals is ready to help you represent your achievements with beautiful certificate.</h4>
          <Link className="btn">Learn More</Link>
        </div>
        <div className="aboutAboutImg">
          <img src={Gallery3} alt="" />
        </div>

      </div>

        <div className="aboutGallery">
          <h3>Our Gallery</h3>
          <hr className='stroke'/>
          <div className="aboutGalleryS">
            <img src={Gallery1} alt="" />
            <img src={Gallery2} alt="" />
            <img src={Gallery3} alt="" />
            <img src={Gallery4} alt="" />
            <img src={Gallery5} alt="" />
            <img src={Gallery6} alt="" />
          </div>
        </div>

        <div className="aboutFooter">
          footer
        </div>


      <Outlet/>
    </div>
  )
}

export default aboutUs
