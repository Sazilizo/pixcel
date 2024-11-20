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
    

    return(
        <filterContext.Provider value={{findByFirstLetter,resetFilters,filteredModels,filterLetter, searchByName,getAllByCountry,getAllByExperience,getAllByGender}}>
            {children}
        </filterContext.Provider>
    );
};

export default FilterContext;