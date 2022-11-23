import React from 'react';
import './Comingsoon.css'
import arrowRight from './images/arrowRight.png'
import under_construction from './images/under_construction.png'



function Comingsoon() {
  return (
    <div id='comingsoon'>
      <div className='container'>
        <div className='main'>
          <div className='welcome'>
            <div className='welcomeHead'>
              <div className='back'>
                <img src={arrowRight} className='arrow' alt='arrow right'></img>
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
                src={under_construction}
                className='cons_img'
                alt=''></img>
            </div>
          </div>
          <div className='formdat'>
            <form className='emyform'>
              <input
                type='email'
                placeholder='Your email'
                className='email'></input>
              <button className='btn'>Notify me</button>
            </form>
            <div className='spam'>~Don't worry we will not spam you~</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
export default Comingsoon;
