import React, { useContext, useEffect,useState } from 'react';
import Model from './model';
import { useLocation } from 'react-router-dom';
import { formContext } from '../context/UserContext';
import { FilterByFirstLetter } from './Filters';

const Men = () => {
    const {models} = useContext(formContext)
    const location = useLocation();  // Check if this is causing the issue
    const [filteredByGender, setFilteredByGender] = useState([]);
    const [displayedModels, setDisplayedModels] = useState([]); 

    const handleFilterByGender = () => {
        const filtered = models.filter((model) => model.gender === "M");
        setFilteredByGender(filtered);
        setDisplayedModels(filtered);
    };

    useEffect(() => {
        handleFilterByGender();
    }, [location.pathname]);
  return (
    <div className="models-showcase">
        <FilterByFirstLetter models={filteredByGender} setFilteredModels={setDisplayedModels} />
        <div className="models-page--showcase">
            <Model models={displayedModels}/>
        </div>
    </div>
  )
}

export default Men;