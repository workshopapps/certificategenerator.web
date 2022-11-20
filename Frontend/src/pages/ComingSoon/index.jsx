import React from 'react';

function Comingsoon() {
  return (
    <div id='comingsoon'>
      <div className='container'>
        <div className='main'>
          <div className='welcome'>
            <div className='welcomeHead'>
              <div className='back'>
                <img src='images/arrowRight.PNG' className='arrow' alt=''></img>
                Back to Home
              </div>
              <div className='f1'>Coming Soon!</div>
              <div className='p'>
                We are currently working hard to build this page but you can
                submit your email for update once the page is up.
              </div>
            </div>
            <div className='construction'>
              <img
                src='images/under_construction.png'
                className='cons_img'
                alt=''></img>
            </div>
          </div>
          <div className='formdat'>
            <form className='form'>
              <input
                type='email'
                placeholder='Your email'
                className='email'></input>
              <button className='btn'>Notify me</button>
            </form>
            <div className='spam'>~Don't worry we will not spam you~</div>
          </div>
        </div>
        <footer>
          <div className='social'>
            <div className='socail_des'>We are social</div>
            <div className='socail_logo'>
              <img src='images/instagra.png' alt=''></img>
              <img src='images/Linkedin.png' alt=''></img>
              <img src='images/twitter.png' alt=''></img>
              <img src='images/github.png' alt=''></img>
            </div>
          </div>
          <ul>
            <li>Pricing</li>
            <li>Blog</li>
            <li>FAQs</li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
export default Comingsoon;
