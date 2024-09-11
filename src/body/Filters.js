import React, { useContext, useEffect, useState } from 'react';
import { filterContext } from '../context/filterContext';
 

export const SearchByNameFilter=()=>{
    const {searchByName} = useContext(filterContext);
    const [name, setName] = useState("");

    const handleChange =(e)=>{
        setName(e.target.value)
    }

    return(
        <>
            <div className="filter-elements">
                <input type="search" value={name} name="name" onChange={(e)=>handleChange(e)} className='search-bar' placeholder='enter a name'></input>
                <button type="submit" onClick={()=>searchByName(name)}>search</button>
            </div>
        </>
    )
};

export const SearchByGender=()=>{
    const {getAllByGender} = useContext(filterContext);
    const [getGender, setGender] = useState("");
    const handleChange =(e)=>{
        setGender(e.target.value);
    }

    useEffect(()=>{
        getAllByGender(getGender);
        console.log(getGender);
    },[getGender]);
    console.log(getGender)
    return(
        <>
                <div className="filter-elements">
                    <select id="gender" name="gender" value={getGender} onChange={(e)=>handleChange(e)} required>
                        <option value="" disabled>Select yor gender</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                    </select>
                </div>
        </>
    )
};

export const SearchByCountry =()=>{
    const {getAllByCountry} = useContext(filterContext);
    const [country, setCountry] = useState("");

    const handleChange = (e)=>{
        setCountry(e.target.value)
    }

    console.log(country)
    return(
        <>
            <div className="filter-elements">
                <input type="search" value={country} name="country" onChange={(e)=>handleChange(e)} className='search-bar' placeholder='enter a country'></input>
                <button type="submit" onClick={()=>getAllByCountry(country)}>search</button>
            </div>
        </>
    )
};

export const FilterByExperience =()=>{
    const {getAllByExperience} = useContext(filterContext);
    const [exp, setExp] = useState("");

    const handleChange =(e)=>{
        setExp(e.target.value);
    }
    useEffect(()=>{
        getAllByExperience(exp)
    },[exp])
    return (
        <div className="filter-elements">
                    <select id="experience" name="experience" value={exp} onChange={(e)=>handleChange(e)} >
                        <option value="" disabled>Select experience level</option>
                        <option value="0-1">Beginner (0-1 year)</option>
                        <option value="1-3">Junior (1-3 years)</option>
                        <option value="3-5">Mid-Level (3-5 years)</option>
                        <option value="5-10">Professional (5-10+ years)</option>
                    </select>
                </div>
    )
};

export const FilterByFirstLetter =()=>{
    const {findByFirstLetter,filterLetter} = useContext(filterContext);
    return (
        <div className="alphabet-filter--wrapper">
            <div className="alphabet-filter">
            {filterLetter.map(letter => (
                <button className="alphabet-btn" key={letter} onClick={() => findByFirstLetter(letter.toLowerCase())}>
                {letter}
                </button>
            ))}
            </div>
        </div>
      );
};

export const ResetFilters=()=>{
    const {resetFilters} = useContext(filterContext);

    return (
        <button className='clearFilters' type="reset" onClick={()=>resetFilters()}>clear filters</button>
    )
}

const PageFilters = ()=>{
    return (
        <div className="filters">
            <ResetFilters/>
            <SearchByNameFilter/>
            <SearchByCountry/>
            <SearchByGender/>
            <FilterByExperience/>
        </div>
    )
};

export default PageFilters;