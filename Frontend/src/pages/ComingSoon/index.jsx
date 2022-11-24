import React from 'react';
import './Comingsoon.scss'
import { Link } from "react-router-dom";
import under_construction from './images/under_construction.png'
import { AiOutlineArrowLeft } from "react-icons/ai";

function Comingsoon() {
  const handleClick = (e)=>{
    e.preventDefalt();
  } 

  return (
    <section id='comingsoon'>
      <article className='welcomeHead'>
        <Link to="/home" className='back'>
          <AiOutlineArrowLeft className='arrow' />
          <span>Back to Home</span>
        </Link>

        <div className='f1'>Coming Soon!</div>

        <div className='p'>
          We are currently working hard to build this page but you can
          submit your email for update once the page is up.
        </div>
              
        <div className='formdat'>
          <div className='fx'>
            <form className='emyform' onSubmit={handleClick}>
              <input
                type='email'
                placeholder='Your email'
                className='email' 
              />
            </form>

            <button type='submit' className='btn'>Notify me</button>
          </div>

          <div className='spam'>~Don't worry we will not spam you~</div>
        </div>
      </article>

      <article className='construction'>
        <img src={under_construction} alt='' />
      </article>
    </section>
  );
}
export default Comingsoon;
