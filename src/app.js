// require("file-loader?name=[name].[ext]!./index.html")
import React from "react";
import "./styling/main.css";
import "./styling/header.css"

const App= ()=>{
    return (
        <div className="container">
            <h2>Hello world</h2>
        </div>
    );
};

export default App;