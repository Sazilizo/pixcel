import React, { useState, useContext, useEffect } from "react";
import Logo from "./logo";
import Watchlist from "./watchlist";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import { formContext } from "../context/UserContext";

const Header=()=>{
    const {isLoggedIn,setIsLoggedIn, handleLogOut} = useContext(formContext)
    const [search, setSearch] = useState();
    const [models, setModels] = useState("men");
    const navigate = useNavigate();

    // const loggedIn = Boolean(localStorage.getItem("isLoggedIn"));
    
    useEffect(() => {
        const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        setIsLoggedIn(loggedIn || false);
    }, [setIsLoggedIn]);

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
    }, [isLoggedIn, navigate]);
    const data = "gather the best and upcoming models and photographers for your portfolio, making life easier for you."
    return(
        <div className="header">
            <div className="navigation">
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
                <div className="navigation-menu">
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                            <li className="models-group"><Link to="/models">Models</Link>
                                <ul className="models-listing">
                                    <li>Men
                                        <ul>
                                            <li>Professionals</li>
                                            <li>Amateurs</li>
                                        </ul>
                                    </li>
                                    <li>Women
                                        <ul>
                                            <li>Professionals</li>
                                            <li>Amateurs</li>
                                        </ul>
                                    </li>
                                </ul>
                                
                            </li>
                            {!isLoggedIn && <li><Link to="/apply">Apply</Link></li>}
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
            <h1>Searched:{search}</h1>
        </div>
    )
};

export default Header