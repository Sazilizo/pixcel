import React, {createContext, useState, useEffect} from "react";
import imageCompression from 'browser-image-compression';
import { useNavigate } from "react-router-dom";
export const formContext = createContext();

const UsersContext = ({children})=>{
    // const navigate = useNavigate()
    const [models, setModels] = useState(() => {
        const savedModels = localStorage.getItem('models');
        return savedModels ? JSON.parse(savedModels) : [];
      });
    
    const [loggedMessage, setLoggedMessage] = useState({msg:"", res:""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    const [model, setModel] = useState({
        id: models.length + 1,
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

    
      // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };
    const handleLoginSubmit =(e)=>{
        e.preventDefault();
        // setSubmitted(true);
    }

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
        console.log(isLoggedIn)
    }, [isLoggedIn]);

    // useEffect(()=>{
    //     localStorage.clear();
    // },[])
    return(
        <formContext.Provider value={{currentUser,handleApplyFormChange, handleSubmit,handleLogin,handleLoginChange,handleLogOut,handleLoginSubmit,loggedMessage,isLoggedIn, models,setCurrentUser,setModels,submitted,setIsLoggedIn,user}}>
            {children}
        </formContext.Provider>
    )
};

export default UsersContext;