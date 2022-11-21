import React from 'react';
import "./pricing.style.scss";
import { data } from './data';
// import { Link } from "react-router-dom"
// import Carousel from 'react-bootstrap/Carousel';

function Slider ({ value }) {

  const { per } = data[value];

  return (
    <></>
    // <Carousel className="plansContainer" id="slider" indicatorLabels = {[ "btn1", "btn2", "btn3" ]} controls={false}>
    //     {data[value].subscription.map((item)=>{
    //         const { id, sub } = item;

    //         return(
    //             <Carousel.Item className={sub.subType} key={id}>
    //                 <h4>{sub.subType}</h4>

    //                 <p>{sub.header}</p>

    //                 <h3>{sub.amount}<span>{per}</span></h3>

    //                 <p>{sub.text}</p>

    //                 <article>
    //                     {sub.subText.map((item)=>{
    //                         const { id, img, txt } = item;
    //                         return(
    //                             <div className="others" key={id}>
    //                                 <img src={img} alt={txt} />
    //                                 <span>{txt}</span>   
    //                             </div>
    //                         );
    //                         })}
    //                 </article>

    //                 <Link to={sub.linkTo}>
    //                     {sub.linkText}
    //                 </Link>
    //             </Carousel.Item>
    //         );
    //     })}
    // </Carousel>
  );
}

export default Slider;