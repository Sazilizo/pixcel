// require("file-loader?name=[name].[ext]!./index.html")
import React from "react";
import Header from "./head/header";
import Footer from "./footer/footer"
import "./styling/main.css";

const App= ()=>{
    return (
        <div className="container">
            <Header/>
            <Footer/>
        </div>
    );
};

export default App;