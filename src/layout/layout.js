import React, { useContext, useEffect,useState } from "react";
import Header from "../head/header";
import Footer from "../footer/footer";
import "../styling/main.css";
import "../styling/navbar.css";
import "../styling/models.css";
import { Link, Outlet } from "react-router-dom";

const Layout =()=>{
    return (
            <div className="container">
                <Header/>
                <Outlet/>
                <footer>
                <Footer/>
                </footer>
            </div>
    );
};

export default Layout;