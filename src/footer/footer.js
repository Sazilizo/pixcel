import React from 'react';
import Contacts from './contacts';
import Logo from '../head/logo';

const Footer = ()=>{
    return(
        <div className="Footer">
            <div className="footer-logo">
                <Logo/>
            </div>
            <div className="location">
                <div className="location-1">
                    <address>
                        visit us:<br />
                        Picxel Academy<br />
                        South Africa<br />
                        Western Cape, Cape Town<br />
                    </address>
                </div>
            </div>
            <Contacts/>
            <p className="terms-conditions">
            &copy;Copyright picxel academy  {new Date().getFullYear()} - all rights reserved;
            </p>
        </div>
    );
};

export default Footer;