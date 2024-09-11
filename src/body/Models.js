import React, {useState, useContext,useEffect} from "react";
import { formContext } from "../context/UserContext";
import Model from "./model";
import { Outlet, useParams} from "react-router-dom";
import { filterContext } from "../context/filterContext";
import PageFilters, { FilterByExperience, FilterByFirstLetter, ResetFilters, SearchByCountry, SearchByGender, SearchByNameFilter } from "./Filters";
const Models =()=>{
    const {models} = useContext(formContext);
    const {filteredModels} = useContext(filterContext);
    const {id} = useParams()


    return(
        <div className="models-showcase">
            {id? <Outlet/>:
            <>
            <h2>Models</h2>
            <FilterByFirstLetter/>
            <div className="models-filters-wrapper">
                <div className="models-model-filters">
                    <PageFilters/>
                </div>
                <div className="models-page--showcase">
                    <Model models={filteredModels} classname="model-wrapper"/>
                </div>
            </div>
            </>
            }
        </div>

    )
}


export default Models;