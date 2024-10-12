import React, { useState, useContext, useEffect } from "react";
import Logo from "./logo";
import Watchlist from "./watchlist";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { formContext } from "../context/UserContext";
import NavBar from "./NavBar";
import HeaderSlider from "./headerSlider";

const Header=()=>{
    const {isLoggedIn,setIsLoggedIn, handleLogOut} = useContext(formContext)
    const [search, setSearch] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const location = useLocation();


    const LogInLogOutControl = () => {
        if (isLoggedIn) {
            return <button className="logout-btn" onClick={handleLogOut}>Log out</button>;
        } else {
            return <Link to="/login"><FaRegUser /></Link>;
        }
    };


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
        const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        setIsLoggedIn(loggedIn || false);
    }, [isLoggedIn, navigate]);

    const getDynamicHeight = () => {
        if ((location.pathname.includes("/models"))) {
          return '30vh';
        }
        return '90vh';
      };
      
      const dynamicHeight = getDynamicHeight();
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    // Update windowWidth on window resize
    useEffect(() => {
        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <div className="header" style={{"height":dynamicHeight}}>
            <div className={windowWidth > 760?"navigation":"collapsible"}>
                <div className="logo-search-user">
                    <div className="logo">
                        <Logo color="white"/>
                    </div>
                    <div className="user-history">
                        {
                            LogInLogOutControl()
                        }
                        <Watchlist/>
                        
                    </div>
                </div>
                <div className={windowWidth > 760 ? "navigation-menu--wrapper sticky-menu": "navigation-menu-wrapper"}>
                    <NavBar windowWidth={windowWidth} isLoggedIn={isLoggedIn}/>
                </div>
            </div>
            {location.pathname === "/" || location.pathname === "/about"?<HeaderSlider/>:""}
        </div>
    )
};

export default Header