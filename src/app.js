// require("file-loader?name=[name].[ext]!./index.html")
import React from "react";
import Header from "./head/header";
import Footer from "./footer/footer";
import Apply from "./forms/apply";
import "./styling/main.css";

const App= ()=>{
    return (
        <div className="container">
            <Header/>
            <Apply/>
            <Footer/>
        </div>
    );
};

export default App;