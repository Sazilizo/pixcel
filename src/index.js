// require("file-loader?name=[name].[ext]!./index.html")
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import Apply from "./forms/apply";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./forms/login";
import UsersContext, { formContext } from "./context/UserContext";
import ModelDetails from "./body/ModelDetails";
import Models from "./body/Models";
import UpdateProfile from "./forms/updateProfile";
import FilterContext from "./context/filterContext";


const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/apply',
        element: <Apply/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:"/models",
        element: <Models/>,
        children:[
            {
                path:"/models/:id",
                element:<ModelDetails/>,
                children:[
                    {
                        path:"models/:id/update-profile",
                        element:<UpdateProfile/>
                    }
                ]
                
            }
        ]
    },
    {
        path:"/update-profile",
        element: <UpdateProfile/>
    }
    
])
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <StrictMode>
        <UsersContext>
            <FilterContext>
                <RouterProvider router={router}>
                        <App/>
                </RouterProvider>
            </FilterContext>
        </UsersContext>
    </StrictMode>
)