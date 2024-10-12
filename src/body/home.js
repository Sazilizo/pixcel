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

    const handleFilterByGender = () => {
        // const filtered = models.filter((model) => model.gender === "M");
        // setFilteredByGender(filtered);
        // setDisplayedModels(filtered);
    };

    useEffect(() => {
        handleFilterByGender();
    }, [location.pathname]);

  
    useEffect(()=>{
        setIsLoading(false)
        console.log("app:",pageData)
        console.log(pageData && pageData.aboutContent.How)
    }, [pageData])

    useEffect(()=>{
        console.log(location.pathname)
    },[])
    
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
                                        <Model models={displayedModels} />
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
            <Teams/>
    </>
  )
}

export default Home;