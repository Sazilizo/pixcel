import React, { useState, useContext, useEffect } from "react";
import Logo from "./logo";
import Watchlist from "./watchlist";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import { formContext } from "../context/UserContext";
import NavBar from "./NavBar";

const Header=()=>{
    const {isLoggedIn,setIsLoggedIn, handleLogOut} = useContext(formContext)
    const [search, setSearch] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();


    const LogInLogOutControl = () => {
        if (isLoggedIn) {
            return <button onClick={handleLogOut}>Log out</button>;
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
    const data = "gather the best and upcoming models and photographers for your portfolio, making life easier for you."
    return(
        <div className="header">
            <div className={windowWidth > 760?"navigation":"collapsible"}>
                <div className="logo-search-user">
                    <div className="logo">
                        <Logo color="white"/>
                    </div>
                    {/* <div className="search-bar">
                        <input onChange={(e)=>handleSearch(e)} type="search"></input>
                        <IoSearch className="search-icon"/>
                    </div> */}
                    <div className="user-history">
                        {/* {setTimeout(()=>{
                            <p>{loggedMessage}</p>
                        },3000)} */}

                        {
                            LogInLogOutControl()
                        }
                        <Watchlist/>
                        
                    </div>
                </div>
                <div className="navigation-menu--wrapper">
                    <NavBar windowWidth={windowWidth} isLoggedIn={isLoggedIn}/>
                </div>
            </div>
        </div>
    )
};

export default Header