import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";

const Contacts =()=>{
    return(
        <div className="social-media-contacts">
            <FaFacebookF />
            <FaXTwitter />
            <FaInstagram />
            <FaWhatsapp />
        </div>
    );
};

export default Contacts;