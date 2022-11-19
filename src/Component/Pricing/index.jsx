import React, { useState } from "react";
import "./pricing.style.scss";
import Feature from "./feature";
import { Link } from "react-router-dom";
import { data, testimonials } from "./data";

function Pricing() {
    const [value, setValue] = useState(0);

    const { per } = data[value];

    return(
        <main>
            <section className="pricing">
                <article className="text">
                    <p>PRICING</p>

                    <h3>Choose a plan tailored to your needs</h3>

                    <p>Buy a plan that's right for you. With Certawi 
                        you can tailor your plan to suit your budget and needs. 
                        Choose to upgrade or downgrade your plan at any time – it's up to you!
                    </p>
                </article>

                <article className="plans">
                    <div className="btnContainer">
                        {data.map((item,index)=>{
                            return(
                                <div key={item.id} onClick={()=> {setValue(index)}} className={`plan-btn ${index === value && "active-btn"}`}>
                                    {item.plan}
                                </div>
                            );
                        })}
                    </div>

                    <div className="plansContainer">
                        {data[value].subscription.map((item)=>{
                            const { id, sub } = item;
                            return(
                                <div className={sub.subType} key={id}>
                                    <h4>{sub.subType}</h4>

                                    <p>{sub.header}</p>

                                    <h3>{sub.amount}<span>{per}</span></h3>

                                    <p>{sub.text}</p>

                                    <article>
                                        {sub.subText.map((item)=>{
                                            const { id, img, txt } = item;
                                            return(
                                                <div className="others" key={id}>
                                                    <img src={img} alt={txt} />
                                                    <span>{txt}</span>   
                                                </div>
                                            );
                                        })}
                                    </article>

                                    <Link to={sub.linkTo}>
                                        {sub.linkText}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </section>

            <Feature />

            <section className="testimonials">
                <article className="text">
                    <p>TESTIMONIALS</p>

                    <h3>What our clients say about us</h3>

                    <div className="testimonialContainer">
                        {testimonials.map((item)=>{
                            const { id, text, img, name, position } = item;

                            return(
                                <div key={id}>
                                    <img src="/assets/Frame.svg" alt="quote" />

                                    <p className="txt">{text}</p>

                                    <div>
                                        <img src={img} alt={name} />

                                        <div>
                                            <p>{name}</p>
                                            <p>{position}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </section>

            <section className="bg"></section>
        </main>
    );
}

export default Pricing;