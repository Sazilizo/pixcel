import React, {useEffect, useState} from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import {Link} from "react-router-dom";

const NavBar = ({windowWidth,isLoggedIn}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openCloseTrack = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(()=>{
        console.log(windowWidth);
    },[windowWidth])
  return (
    <nav className={windowWidth > 760 ? "navigation-menu" : "navigation-menu--small-screen black-bcg"}>
        <ul className={isMenuOpen || windowWidth > 760 ? "nav-links" : "nav-links hidden"}>
            <li>Home</li>
            <li>About Us</li>
            <li className="models-group">
                <Link to="/models">Models</Link>
                    <div className="menu-model-categories">
                        <ul>
                            <li className="models-group__subgroup">Men
                                <ul>
                                    <li>Professionals</li>
                                    <li>Amateurs</li>
                                </ul>
                            </li>
                            <li className="models-group__subgroup">Women
                                <ul>
                                    <li>Professionals</li>
                                    <li>Amateurs</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </li>
                {!isLoggedIn && <li className="login-logout-container">
                    <Link to="/apply">Apply</Link>
                </li>}
            <li>Contact us</li>
        </ul>
        {windowWidth <= 760 && (
        <button type="button" className="menu-control" onClick={openCloseTrack}>
                {isMenuOpen ? <IoCloseOutline fontSize="20px"/> : <CiMenuBurger fontSize="20px" />}
        </button>
        )}
     </nav>
  )
}

export default NavBar