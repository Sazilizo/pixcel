import React,{ useContext, useEffect, useState } from "react";
import { formContext } from "../context/UserContext";
import { Link,Outlet, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Model = ({models})=>{
    const location = useLocation();  // Check if this is causing the issue
    const [filteredByGender, setFilteredByGender] = useState([]);

    const handleFilterByGender = () => {
        // Assuming `models` is an array available in this component
        const filtered = models.filter((model) =>
        location.pathname.includes("women") ? model.gender === "F" : model.gender === "M"
        );
        setFilteredByGender(filtered || models);
    };

    useEffect(() => {
        handleFilterByGender();
    }, [location.pathname]);
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
                            <h2 className="model--country">Country:{model.location?.country}</h2>
                            <p className="model--experience">Experience:{model?.experience} years</p>
                        </div>
                    </div>
                </div>
            )
        }): <h4>No results found</h4>}
        </>
    )
};

export default Model;