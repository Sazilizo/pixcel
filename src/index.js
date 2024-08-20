// require("file-loader?name=[name].[ext]!./index.html")
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./styling/main.css";
import "./styling/header.css"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <App/>
)