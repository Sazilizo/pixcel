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
    const [file, setFile] = useState([])
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
        shoeSize:"",
        breastSize:""
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
    // Helper function to convert file to base64
    const uploadFileToContentful = async (file, environment) => {
        const upload = await environment.createUpload({
            file: file, // Raw file binary data
          });
        
          // Step 2: Create an asset from the uploaded file
          const asset = await environment.createAsset({
            fields: {
              title: {
                'en-US': file.name, // Asset title as the file name
              },
              file: {
                'en-US': {
                  contentType: file.type, // Mime type of the file
                  fileName: file.name,
                  uploadFrom: {
                    sys: {
                      type: 'Link',
                      linkType: 'Upload',
                      id: upload.sys.id, // Link to the uploaded file
                    },
                  },
                },
              },
            },
          });
        
          // Step 3: Process and publish the asset
          const processedAsset = await asset.processForAllLocales();
          const publishedAsset = await processedAsset.publish();
          
          return publishedAsset;
    };
  
    const handleModelSubmit = async (model) => {
      console.log("file", file);
  
      const client = createClient({
          accessToken: "CFPAT-cSBIHujJ3IoArRwvU5qiv78208xR7miMB1NI3e_877k",
      });
      const mySpace = "f6h9sdw34o4o";
      const space = await client.getSpace(mySpace);
      const environment = await space.getEnvironment("master");


      const profilePictureAsset = await uploadFileToContentful(file.profilePicture, environment);

    // Step 2: Upload other images and get their IDs
        const otherImagesAssetIds = await Promise.all(
        file.otherImages.map(async (file) => {
            const otherImageAsset = await uploadFileToContentful(file, environment);
            return otherImageAsset.sys.id;
        })
        );

    // Create the entry with the uploaded assets
      const entry = await environment.createEntry("user", {
          fields: {
                id: {
                    "en-US": uuidv4(),
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
                    country: model.nationality,
                    city: model.city,
                    province: model.province,
                    street: model.street,
                    zipCode: model.zipCode
                    }
                },
                socialMedias: {
                    'en-US': {
                    facebook: model.facebook,
                    twitter: model.twitter,
                    instagram: model.instagram,
                    tiktok: model.tiktok,
                    }
                },
                portfolio:{
                    "en-US":model.portfolio
                },
                profilePicture: {
                    'en-US': {
                    sys: {
                        type: 'Link',
                        linkType: 'Asset',
                        id: profilePictureAsset.sys.id // Link to the profile picture asset
                    }
                    }
                },
                gallery: {
                    'en-US': otherImagesAssetIds.map((id) => ({
                        sys: {
                        type: 'Link',
                        linkType: 'Asset',
                        id: id, // Link to each uploaded asset
                        },
                    })),
                },
                height:{
                    "en-US": parseInt(model.height)
                },
                weight:{
                    "en-US": parseInt(model.height)
                },
                specialMarkings:{
                    "en-US": model.specialMarking
                },
                motivation:{
                    "en-US": model.motivation
                },
                shoeSize: {"en-US" :parseInt(5)}
          },
      });
  
      console.log("Entry created successfully:", entry);
  
      try {
          const publishedEntry = await entry.publish();
          console.log("Entry published successfully:", publishedEntry);
      } catch (error) {
          console.error("Error creating or publishing entry:", error);
      }
  
      setSubmitted(true);
  };
  
    //     e.preventDefault();
    //     await createEntry(model); 
    //     setSubmitted(true);
    //   };
    const handleLoginSubmit =(e)=>{
        e.preventDefault();
        // setSubmitted(true);
    }

    useEffect(()=>{
        // let newModels = []
        // client.getEntries({content_type: 'models'})
        // .then((res)=>{
        //     // console.log(res.items[0].fields.models.models);
        //     // newModels.push(res.items[0].fields.models.models);
        //     // setModels( ...newModels);
        // })
        // .catch(console.error)

        client.getEntries({content_type: 'user'})
        .then((res)=>{
            const models = res.items
            const cleanedUp = models.map(model=>{
                console.log(model.fields)
                const {sys, fields} = model
                const {id} = sys;
                const {
                    name, lastName,
                    gender, email,
                    height,weight,
                    age,motivation,
                    password,ethnicity,
                    portfolio ,socialMedias,location
                } = fields
                const gallery = fields.gallery.map(image=>{
                    return image.fields.file.url
                })
                console.log("location",location.city)
            
                const profilePicture = fields.profilePicture.fields.file.url

                return {id:id,name:name,lastName:lastName,gender:gender,email:email,height:height,weight:weight,age:age,motivation:motivation,password:password,ethnicity:ethnicity,portfolio:portfolio,socialMedias:socialMedias,gallery:gallery,profilePicture:profilePicture,location}
            })
            console.log("cleaned", cleanedUp)
            setModels(cleanedUp);
        })
        .catch(console.error)
    },[submitted])

    // useEffect(()=>{
    //     client.getEntries({content_type: 'user'})
    //     .then((res)=>{
    //         console.log("tihs users?",res.items);
    //         // newModels.push(res.items[0].fields.models.models);
    //         // setModels( ...newModels);
    //     })
    // },[])

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
        // if (submitted) {
        //     const updatedModels = [...models, model];
        //     setModels(updatedModels);
        //     localStorage.setItem("models", JSON.stringify(updatedModels));
        // }
        console.log(models)
        if(models && submitted){
            handleLogin();
        }
    },[submitted]);

    useEffect(()=>{
        console.log("models",models.location);
    },[models])

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
        <formContext.Provider value={{setFile,currentUser,handleApplyFormChange, handleModelSubmit,handleLogin,handleLoginChange,handleLogOut,handleLoginSubmit,loggedMessage,isLoggedIn, models,pageData,setCurrentUser,setModels,submitted,setIsLoggedIn,user}}>
            {children}
        </formContext.Provider>
    )
};

export default UsersContext;