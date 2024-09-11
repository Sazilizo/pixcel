// require("file-loader?name=[name].[ext]!./index.html")
import React, { useContext } from "react";
import Header from "./head/header";
import Footer from "./footer/footer";
import Apply from "./forms/apply";
import "./styling/main.css";
import { useLocation } from "react-router-dom";
import UsersContext, { formContext } from "./context/UserContext";
import Model from "./body/model";
import ModelProfile from "./body/ModelProfile";

const App= ()=>{
    const {isLoggedIn,models} = useContext(formContext);
    const location = useLocation();
    // const {id} = useParams()
    console.log(models);
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
                                <h2>Models</h2>
                                <div className="homepage-models--wrapper">
                                    <Model models={modelsToRender} />
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
