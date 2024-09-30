// require("file-loader?name=[name].[ext]!./index.html")
import React, { useContext, useEffect,useState } from "react";
import Header from "./head/header";
import Footer from "./footer/footer";
import Apply from "./forms/apply";
import "./styling/main.css";
import "./styling/navbar.css"
import "./styling/models.css"
import { useLocation } from "react-router-dom";
import UsersContext, { formContext } from "./context/UserContext";
import Model from "./body/model";
import ModelProfile from "./body/ModelProfile";
import Skeleton from 'react-loading-skeleton';
import { FilterByFirstLetter } from "./body/Filters";

const App= ()=>{
    const {isLoggedIn,models} = useContext(formContext);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();

    console.log(isLoading)
    useEffect(()=>{
        setIsLoading(false)
    }, [models])
    const modelsToRender = location.pathname === "/" ? models.slice(0, 4) : models;
    return (
            <div className="container">
                <Header/>
                <div>
                    {isLoggedIn ? (
                        <ModelProfile />
                        ) : (
                        location.pathname === '/' ? (
                            <>
                                <div className="homepage-models--wrapper">
                                    <h2 className="models-main-heading">Models</h2>
                                    <FilterByFirstLetter/>
                                    <div className="models-page--showcase">
                                        <Model models={modelsToRender} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="homepage-models--wrapper">
                                <Model models={models} classname={"home-page-model-wrapper"} />
                            </div>
                        )
                    )}

                </div>
                <Footer/>
            </div>
    );
};

export default App;
