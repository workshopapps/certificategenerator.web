import React, { useState } from "react";
import "./pricing.style.scss";
import { data } from "./data";

function Pricing() {
    const [value, setValue] = useState(0);

    const { id, plan, subscription, per } = data[value];

    return(
        <main>
            <section className="pricing">
                <article>
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
                </article>


            </section>
        </main>
    );
}

export default Pricing;