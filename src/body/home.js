import React, {useState, useEffect, useContext}from 'react'
import Model from "../body/model";
import ModelProfile from "../body/ModelProfile";
import Skeleton from 'react-loading-skeleton';
import { FilterByFirstLetter } from './Filters';
import { useLocation, Link } from "react-router-dom";
import UsersContext, { formContext } from "../context/UserContext";
import Apply from "../forms/apply";
import Teams from './Teams';


const Home = () => {
    const {isLoggedIn,models,pageData} = useContext(formContext);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedModels, setDisplayedModels] = useState([]);
    const location = useLocation();
  return (
    <>
        <div className="home-container">
            <div id="/about-us" className="about-us-intro-wrapper">
                <div className="about-us-intro border-div">
                    <h2 className="secondary-heading">{pageData && pageData.aboutContent.heading}</h2>
                    <p>{pageData && pageData.aboutContent.about}</p>
                    <p>{pageData && pageData.aboutContent.How}</p>
                    <p>{pageData && pageData.aboutContent.advantages}</p>
                    {/* <link to="apply">Apply here</link> */}
                    <Link className='call-to-action-btn' to="/apply">Apply now</Link>
                </div>
            </div>
                    {isLoggedIn ? (
                        <ModelProfile />
                        ) : (
                        location.pathname === '/' ? (
                            <>
                                <div className="homepage-models--wrapper">
                                    <h2 className="secondary-heading">Models</h2>
                                    <FilterByFirstLetter models={models} setFilteredModels={setDisplayedModels} />
                                    <div className="models-page--showcase">
                                        <Model models={displayedModels.length > 0? displayedModels : models.slice(0,4)} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="homepage-models--wrapper">
                                <Model models={models.slice(0, 5)} classname={"home-page-model-wrapper"} />
                            </div>
                        )
                    )}

            </div>
            <Teams/>
    </>
  )
}

export default Home;