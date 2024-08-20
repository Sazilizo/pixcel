import React from "react";
import Logo from "./logo";
import Watchlist from "./watchlist";
import { FaRegUser } from "react-icons/fa";

const Header=()=>{
    return(
        <div className="header">
            <div className="logo-history-container">
                <div className="logo">
                    <Logo />
                </div>
                <div className="history-watchlist">
                    <div className="user">
                    <FaRegUser />
                    </div>
                    <Watchlist/>
                </div>
            </div>
            <div className="navigation-menu">
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>models
                        <ul>
                            <li>Professonals</li>
                            <li>Amateurs</li>
                        </ul>
                    </li>
                    <li>pricing</li>
                    <li>contact us</li>
                </ul>
            </div>
        </div>
    )
};

export default Header