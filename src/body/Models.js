import React, {useState, useContext,useEffect} from "react";
import { formContext } from "../context/UserContext";
import Model from "./model";
import { useLocation } from "react-router-dom";
import { Outlet, useParams} from "react-router-dom";
import { filterContext } from "../context/filterContext";
import PageFilters, { FilterByExperience, ResetFilters, SearchByCountry, SearchByGender, SearchByNameFilter } from "./Filters";

const Models =()=>{
    const {models} = useContext(formContext);
    const [displayedModels, setDisplayedModels] = useState([]);
    const {id} = useParams(); 

    const handleFilterByGender = () => {
        const filtered = models.filter((model) => model.gender === "M");
        setFilteredByGender(filtered);
        setDisplayedModels(filtered);
    };

    useEffect(() => {
        handleFilterByGender();
    }, [location.pathname]);


    useEffect(()=>{
        console.log("location",location.pathname)
    },[])
    return(
        <div className="models-showcase">
            {id? <Outlet/>:
            <>
            <h2 className="models-main-heading">Models</h2>
            {/* <FiterByFirstLetterl models={models} setFilteredModels={setDisplayedModels} /> */}
            <div className="models-filters-wrapper">
                <div className="models-model-filters">
                    <PageFilters/>
                </div>
                <div className="models-page--showcase">
                    <Model models={models} classname="model-wrapper"/>
                </div>
            </div>
            </>
            }
        </div>

    )
}


export default Models;