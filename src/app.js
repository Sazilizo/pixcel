// require("file-loader?name=[name].[ext]!./index.html")
import React from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Layout from "./layout/layout";
import Apply from "./forms/apply";
import Login from "./forms/login";
import Models from "./body/Models";
import ModelDetails from "./body/ModelDetails";
import Home from "./body/home";
import UpdateProfile from "./forms/updateProfile";
import { SkeletonTheme } from "react-loading-skeleton";
import Men from "./body/Men";
import Women from "./body/Women";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index:true, element: <Home /> },
            { path: 'models/', element: <Models />},
            {path:"models/men", element: <Men/>},
            {path:"models/women", element:<Women/>},
            { path: 'models/:id', element: <ModelDetails /> },
            // { path: 'models/:id/update-profile', element: <UpdateProfile /> },
            { path: 'models/:id/update-profile', element: <UpdateProfile /> },
        ],
    },
    { path: '/apply', element: <Apply /> },
    { path: '/login', element: <Login /> },
]);


const App= ()=>{
    return(
        <SkeletonTheme>
            <RouterProvider router={router}/>
        </SkeletonTheme>
            )
}

export default App;
