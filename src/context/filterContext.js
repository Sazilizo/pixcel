// here we get models from the userContext then we create a few filter
// functions
import React, {createContext, useState, useEffect, useContext} from "react";
import Models from "../body/Models";
import { formContext } from "./UserContext";

export const filterContext = createContext();

const FilterContext = ({children})=>{
    const {models} = useContext(formContext || "");
    const [filterLetter, setFilterLetter] = useState(Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65)));
    const [searchName, setSearchName] = useState("");
    const [searchGender, setSearchGender] = useState("")
    const [filterExp, setFilterExp] = useState();
    const [country, setCountry] = useState("");
    const [sameFirstLetters, setSameFirstLetter] = useState([]);
    const [filteredModels, setFilteredModels] = useState(models);

  // Filtering logic
    const allFilters = () => {
        let filtered = models;
        
        if (searchName) {
        filtered = filtered.filter(model => model.name.toLowerCase() === searchName.toLowerCase() || model.lastName.toLowerCase() === searchName.toLowerCase());
        }

        if (searchGender) {
        filtered = filtered.filter(model => model.gender === searchGender);
        }

        if (country) {
        filtered = filtered.filter(model => model.location.country.toLowerCase() === country.toLowerCase());
        }

        if (filterExp) {
        filtered = filtered.filter(model => model.experience === filterExp);
        }

        setFilteredModels(filtered);
    };


    useEffect(() => {
        allFilters();
    }, [searchName, searchGender, country, filterExp, sameFirstLetters]);
        
    const resetFilters =()=>{
        setFilteredModels(models);
        setFilterExp('');
    }
    useEffect(() => {
        const filteredResults = allFilters();
        console.log("Filtered models:", filteredResults);
        console.log(filterExp);
        console.log(allFilters())
    }, [searchName, searchGender, country, filterExp, sameFirstLetters]);
    
    // Individual Filter Functions
    
    const searchByName = (name) => {
        setSearchName(name);
        setSearchName()
    };
    
    const getAllByGender = (gender) => {
        setSearchGender(gender);
    };
    
    const getAllByCountry = (country) => {
        setCountry(country);
    };
    
    const getAllByExperience = (exp) => {
        setFilterExp(exp);
    };

    const handleFilter = (data, filterCriteria, setState, property = "name") => {
        if (!data || !Array.isArray(data)) return;
      
        // Apply the filtering based on the first letter or any other logic
        const filteredData = data.filter((item) => {
          const valueToCheck = item[property]?.toLowerCase() || "";
          return valueToCheck.startsWith(filterCriteria.toLowerCase());
        });
      
        // Update the component's state with the filtered data
        setState(filteredData);
      }

    const findByFirstLetter =(data,letter)=>{
        handleFilter(initialModels, letter, setFilteredModels, "name")
    }
    
    
    useEffect(()=>{
        const namedModels =searchByName();
        console.log("from search Bar", namedModels);
        console.log(country)

    },[]);

    return(
        <filterContext.Provider value={{findByFirstLetter,resetFilters,filteredModels,filterLetter, searchByName,getAllByCountry,getAllByExperience,getAllByGender}}>
            {children}
        </filterContext.Provider>
    );
};

export default FilterContext;

// const allFilters = ()=>{
        
    // }

    // const searchByName = (name)=>{
    //     const results = models.filter((model)=> model.name === name || model.lastName === name)
    //     if (results.length === 0) return "Not found"
    //     setSearchName(results);
    // }
    // console.log(searchName)
    // const getAllByGender = (gender)=>{
    //     const results = models.filter((model)=>model.gender === gender);
    //     if (results.length === 0) return "Not found"
    //     setSearchGender(results);
    // }
    // console.log(searchGender);
    // const getAllByCountry = (country)=>{
    //     const results = models.filter((model)=>model.country === country);
    //     console.log(results)
    //     if (results.length === 0) return "Not found"
    //     setCountry(results)
    // }

    // const findByFirstLetter = (letter)=>{
    //     const allStartingWith = models.filter((model)=> model.name.toLowerCase().startsWith(letter) || model.lastName.toLowerCase().startsWith(letter));
    //     if (allStartingWith.length === 0) return "Not found"
    //     console.log(allStartingWith)
    //     setSameFirstLetter(allStartingWith);
    // }
    // const getAllByExperience = (exp)=>{
    //     const results = models.filter((model)=> model.experience === exp);
    //     if (results.length === 0) return "Not found"
    //     setFilterExp(results)
    // }