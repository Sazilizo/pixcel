import React from 'react';
import Contacts from './contacts';
import Logo from '../head/logo';

const Footer = ()=>{
    return(
        <div className="Footer">
            <div className="footer-section-top">
                <div className="footer-logo">
                    <Logo/>
                </div>
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
            </p>
        </div>
    );
};

export default Footer;