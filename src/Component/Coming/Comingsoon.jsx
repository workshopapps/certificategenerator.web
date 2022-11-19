import React from "react";
import Navbar from "../Navbar";


function Comingsoon(){
    return(
        <div id="container">
             
                <Navbar />
            <div id="main">
                <div id="welcome">
                    <div id="welcomeHead">
                        <div id="back">
                            <img src="images/arrowRight.PNG" id="arrow" alt=""></img>
                            Back to Home
                        </div>
                        <div id="f1">Coming Soon!</div>
                        <div id="p">
                        We are currently working hard to build this page
                        but you can submit your email for update 
                        once the page is up.
                        </div>
                    </div>
                    <div id="construction">
                        <img src="images/under_construction.png" id="cons_img" alt=""></img>
                    </div>
                </div>
                <div id="formdat">
                    <form >
                            <input type ="email" placeholder= "Your email" id="email"></input>
                            <button id ="btn" >Notify me</button>
                    </form>
                    <div id="spam">~Don't worry we will not spam you~</div>
                </div>
                
            </div>
            <footer>
                        <div id="social">    
                            <div id="socail_des">We are social</div>
                            <div id="socail_logo">
                                <img src="images/instagra.png" alt=""></img>
                                <img src="images/Linkedin.png" alt=""></img>
                                <img src="images/twitter.png" alt=""></img>
                                <img src="images/github.png" alt=""></img>
                            </div>
                        </div>
                        <ul>
                            <li>Pricing</li>
                            <li>Blog</li>
                            <li>FAQs</li>
                        </ul>
                </footer>

        </div>
    )
}
export default Comingsoon;