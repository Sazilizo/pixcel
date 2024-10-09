// require("file-loader?name=[name].[ext]!./index.html")
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import Apply from "./forms/apply";
import Login from "./forms/login";
import UsersContext, { formContext } from "./context/UserContext";
import ModelDetails from "./body/ModelDetails";
import Models from "./body/Models";
import UpdateProfile from "./forms/updateProfile";
import FilterContext from "./context/filterContext";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
        <UsersContext>
            <FilterContext>
                <App/>
            </FilterContext>
        </UsersContext>
)