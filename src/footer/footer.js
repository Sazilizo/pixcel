import React from 'react';
import Contacts from './contacts';
import Logo from '../head/logo';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaRegNewspaper } from "react-icons/fa";

const Footer = ()=>{
    return(
       <div className="footer-section">
            <div className="newsletter">
                <h3>Join our newsletter</h3>
                <input type="text" placeholder="email"></input>
            </div>
            <div className="logo">
                <Logo/>
            </div>
            <div className="address-section">
                <address>
                    visit us:<br />
                    Picxel Academy<br />
                    South Africa<br />
                    Western Cape, Cape Town<br />
                </address>
            </div>
            <div className="links">
                <div id="contact-us"className="social-links">
                    <h4 className="tertiary-heading">follow us</h4>
                    <ul>
                        <li><Link to="https://facebook.com/sazi-lizo">facebook</Link></li>
                        <li><Link to="https://x.com/lizo_sazi">x/twitter</Link></li>
                        <li><Link to="https://instagram.com/lizo_sazi">instagram</Link></li>
                    </ul>
                </div>
                <div className="menu-links">
                    <h4 className="tertiary-heading">shortcuts</h4>
                    <ul>
                        {location.pathname != "/"? <li><Link to="/">Home</Link></li>:""}
                        <li><a href="#about-us">About</a></li>
                        <li><Link to="/models">Models</Link></li>
                        <li><Link to="/apply">Apply</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                &copy;Copyright picxel academy  {new Date().getFullYear()} - all rights reserved;
            </div>
       </div>
    );
};

export default Footer;
{/* 
<div className="location-contacts flex-row">
                    <div className="address-section">
                        <address>
                            visit us:<br />
                            Picxel Academy<br />
                            South Africa<br />
                            Western Cape, Cape Town<br />
                        </address>
                    </div>
                    <Contacts/>
                </div>
                <div className="immediate-contacts flex-row">
                    <div className="contact-me">
                        <a href="mailto:lizosazi@gmail.com">lizosazi@gmail.com</a>
                        <br/>
                        <a href="tel:+27644567890">+27644567890</a>
                    </div>
                    <div className="contact-me">
                        <a href="mailto:lizosazi@gmail.com">lizosazi@gmail.com</a>
                        <br/>
                        <a href="tel:+27644567890">+27644567890</a>
                    </div>
                </div>
            </div>
            <p className="terms-conditions">
            &copy;Copyright picxel academy  {new Date().getFullYear()} - all rights reserved;
            </p> */}