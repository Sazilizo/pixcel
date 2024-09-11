import React,{ useContext } from "react";
import { formContext } from "../context/UserContext";
import { Link,Outlet } from "react-router-dom";

const Model =({models, classname})=>{

    return(
        <>
        {models.length > 0? models.map(model=>{
            return(
                <div key={model.id} className="model-wrapper">
                    <div className="model-image--wrapper">
                        <Link  to={`/models/${model.id}`}><img className="model-image" src={model.profilePicture} alt="Model display photo"></img></Link>
                    </div>
                    <div className="model--content">
                        <div className="model--content--wrapper">
                            <h2 className="model--name">{model.name} {model.lastName}</h2>
                            <h2 className="model--country">Country:{model.country}</h2>
                            <p className="model--name">Experience:{model.experience} years</p>
                        </div>
                    </div>
                </div>
            )
        }): <h4>No results found</h4>}
        </>
    )
};

export default Model;