import "./navbar.style.scss";
import menu from '../Coming/images/menu.svg'

import React from "react";

function Navbar() {
	return (
	<nav>
                <div id="light">
                        Cert<span id="light_col">awi</span>
                        <img src="images/bulb.png" id="bulb" alt=""></img>
                    </div>
                    <div id="items">
                        <ul>
                            <li>Home</li>
                            <li>Browse Templates</li>
                            <li>Pricing</li>
                            <li>Blog</li>
                            <li>FAQs</li>
                            <li>|</li>
                        </ul>
                        <div id="start">Get Started</div> 
                        <img src={menu} alt="" id="menu_logo"></img>                       
                    </div>                   
            
                    
                    
                    
            </nav>
	);
}

export default Navbar;
