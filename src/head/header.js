import React, { useState } from "react";
import Logo from "./logo";
import Watchlist from "./watchlist";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Header=()=>{
    const [search, setSearch] = useState();
    const [models, setModels] = useState("men");

    const handleSearch =(e)=>{
        setSearch(e.target.value)
    };
    console.log(search);
    const data = "gather the best and upcoming models and photographers for your portfolio, making life easier for you."
    return(
        <div className="header">
            <div className="navigation">
                <div className="logo-search-user">
                    <div className="logo">
                        <Logo color="white"/>
                    </div>
                    <div className="search-bar">
                        <input onChange={(e)=>handleSearch(e)} type="search"></input>
                        <IoSearch className="search-icon"/>
                    </div>
                    <div className="user-history">
                        <FaRegUser/>
                        <Watchlist/>
                    </div>
                </div>
                <div className="navigation-menu">
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li className="models-group">Models
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
                        <li>Apply</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
            <h1>Searched:{search}</h1>
        </div>
    )
};

export default Header