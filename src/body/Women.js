import React, {useEffect, useContext, useState } from 'react';
import Model from './model';
import { useLocation } from 'react-router-dom';
import { formContext } from '../context/UserContext';
import { FilterByFirstLetter } from './Filters';


const Women = () => {
    const {models} = useContext(formContext);
    const location = useLocation();
    const [filteredByGender, setFilteredByGender] = useState([]);
    const [displayedModels, setDisplayedModels] = useState([]); 

    const handleFilterByGender = () => {
        const filtered = models.filter((model) => model.gender === "F");
        setFilteredByGender(filtered);
        setDisplayedModels(filtered);
    };

    useEffect(() => {
        handleFilterByGender();
    }, [location.pathname]);
  return (
    <div className="models-showcase">
        <h2 className="secondary-heading">Women</h2>
        <FilterByFirstLetter models={filteredByGender} setFilteredModels={setDisplayedModels} />
        <div className="models-page--showcase">
            <Model models={displayedModels}/>
        </div>
    </div>
  )
}

export default Women;