import React, {createContext, useState, useEffect} from "react";
import imageCompression from 'browser-image-compression';
import { useNavigate, useLocation } from "react-router-dom";
import { client } from "../contentful";
import { createClient} from "contentful-management";
import { v4 as uuidv4 } from 'uuid';

export const formContext = createContext();

const UsersContext = ({children})=>{
    // const navigate = useNavigate()
    const [models, setModels] = useState([]);
    const [loggedMessage, setLoggedMessage] = useState({msg:"", res:""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [pageData, setPageData] = useState();
    //need it to log user in
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    //get the model from the form
    const [model, setModel] = useState({
        id:  uuidv4(),
        name: "",
        lastName: "",
        age: "",
        email: "",
        gender:"",
        password: "",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        portfolio: "",
        experience: "",
        profilePicture:"",
        ethnicity:"",
      });

    const handleApplyFormChange = async(e)=>{
        const { name, value, files, type } = e.target;
        const file = files && files[0];
    
        if (type === "file" && file && file.type.startsWith("image/")) {
            try {
                const options = {
                    maxSizeMB: 3,    
                    maxWidthOrHeight: 400,
                    useWebWorker: true
                };
    
                const compressedFile = await imageCompression(file, options);
    
                const reader = new FileReader();
                reader.onload = (event) => {
                    setModel(prevModel => ({
                        ...prevModel,
                        [name]: event.target.result
                    }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing the image:", error);
            }
        } else {
            setModel(prevModel => ({
                ...prevModel,
                [name]: value
            }));
        }

    }
    const handleLoginChange=(e)=>{
        setUser({
            ...user, [e.target.name]: e.target.value
        })
        
    }

    const handleFilterByGender=()=>{

    }

    const handleLogin=()=>{
        if (!user.email || !user.password) {
            setLoggedMessage({ msg: "Email and password are required.", res: "error" });
            return;
        }
    
        const findUser = models.find((model)=>model.email === user.email && model.password === user.password)
        if (findUser){
            console.log("correct credentials")
            setIsLoggedIn(true);
            setCurrentUser(findUser);
            setLoggedMessage({msg:`Successfully logged in as ${findUser.name}`, res:"success"})
            localStorage.setItem('currentUser', JSON.stringify(findUser));
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            setUser({ email: "", password: "" });
        }
        else{
            setLoggedMessage({msg:"Invalid credentials, try again", res:"error"});
        }

    }
    const handleLogOut =()=>{
        setIsLoggedIn(false);
        setCurrentUser(null); 
        localStorage.removeItem("currentUser");
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        setLoggedMessage({msg:"", res:""})

    }
    const createEntry =async(model)=>{
        const client = createClient({
            accessToken: "CFPAT-cSBIHujJ3IoArRwvU5qiv78208xR7miMB1NI3e_877k"
        })
        const mySpace = "f6h9sdw34o4o";
        const space = await client.getSpace(mySpace);
        const environment = await space.getEnvironment('master');

    // Create the entry
    const entry = await environment.createEntry('user', { 
      fields: {
        id:{
            "en-US": model.id,
        },
        name: {
          'en-US': model.name,
        },
        gender: {
          'en-US': model.gender,
        },
        age: {
          'en-US': parseInt(model.age),
        },
        lastName: {
          'en-US': model.lastName,
        },
        ethnicity:{
            "en-US": model.ethnicity
        },
        password:{
            "en-US": model.password
        },
        email:{
            "en-US":model.email
        },
        location: {
            'en-US': {
              country: model.country,
              city: model.city,
              province: model.province,
              street: model.street,
              zipCode: model.zipCode
            }
        },
        portfolio:{
            "en-US":model.portfolio
        },
        profilePicture:{
            "en-US":{profile: model.profilePicture}
        },
        height:{
            "en-US": currentUser && parseFloat(currentUser.height)
        },
        weight:{
            "en-US": currentUser && parseFloat(currentUser.weight)
        },
        motivation:{
            "en-Us": currentUser && currentUser.motivation
        }
      }
    });
    console.log('Entry created successfully:', entry);
        // Publish the entry
    try{
        const publishedEntry = await entry.publish();
        console.log('Entry published successfully:', publishedEntry);
    } catch (error) {
        console.error('Error creating or publishing entry:', error);
    }
    }
      // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        createEntry(model)
        setSubmitted(true);
    };
    const handleLoginSubmit =(e)=>{
        e.preventDefault();
        // setSubmitted(true);
    }

    useEffect(()=>{
        let newModels = []
        client.getEntries({content_type: 'models'})
        .then((res)=>{
            console.log(res.items[0].fields.models.models);
            newModels.push(res.items[0].fields.models.models);
            setModels( ...newModels);
        })
        .catch(console.error)
    },[submitted])

    useEffect(()=>{
        let pageData = []
        client.getEntries({content_type:"page"})
        .then(res=>{
            console.log("users:",res.items[0].fields)
            pageData.push(res.items[0].fields)
            setPageData(...pageData)
        })
        .catch(console.error)
        // console.log("models",models)
    },[])

    useEffect(()=>{
        if (submitted) {
            const updatedModels = [...models, model];
            setModels(updatedModels);
            localStorage.setItem("models", JSON.stringify(updatedModels));
        }
        console.log(models)
        if(models && submitted){
            handleLogin();
        }
    },[submitted])

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        // if (!isLoggedIn) navigate("/")
        console.log(currentUser)
    }, [isLoggedIn]);
    useEffect(() => {
        console.log("Current Path:", window.location.pathname);
    }, [window.location.pathname]);

    // useEffect(()=>{
    //     localStorage.clear();
    // },[])
    console.log("from context:",models)
    return(
        <formContext.Provider value={{currentUser,handleApplyFormChange, handleSubmit,handleLogin,handleLoginChange,handleLogOut,handleLoginSubmit,loggedMessage,isLoggedIn, models,pageData,setCurrentUser,setModels,submitted,setIsLoggedIn,user}}>
            {children}
        </formContext.Provider>
    )
};

export default UsersContext;