import React, {useEffect, useContext, useState} from "react";
import { formContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import imageCompression from 'browser-image-compression';

const UpdateProfile =()=>{
    const {currentUser, submitted, models,setModels,setCurrentUser} = useContext(formContext);
    const [updatedDetails, setUpdatedDetails] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    //this will set models currentUser with update values
    const updateModel =()=>{
        const updatedModel = {...currentUser,...updatedDetails}
        const updatedModels = models.map(model =>
            model.id === currentUser.id ? updatedModel : model
        )
        setModels(updatedModels);
        setCurrentUser(updatedModel)
        localStorage.setItem('models', JSON.stringify(updatedModels));
        localStorage.setItem('currentUser', JSON.stringify(updatedModel));
    }

    const handleFormChange = async (e) => {
        const { name, value, files, type } = e.target;
      
        if (type === "file" && files.length > 0) {
          try {
            // Compress the images and read them as Base64
            const compressedFiles = await Promise.all(
              Array.from(files).map(async (file) => {
                if (file.type.startsWith("image/")) {
                  const options = {
                    maxSizeMB: 3,
                    maxWidthOrHeight: 400,
                    useWebWorker: true,
                  };
                  
                  // Compress the image file
                  const compressedFile = await imageCompression(file, options);
      
                  // Read the compressed file as Base64 using FileReader
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      resolve(event.target.result); // Base64 string of the compressed image
                    };
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(compressedFile); // Read the file as Base64
                  });
                }
                return null; // Ignore non-image files
              })
            );
      
            // Filter out any null values (non-image files)
            const validCompressedFiles = compressedFiles.filter(file => file !== null);
      
            // Update the state with the compressed image(s)
            setUpdatedDetails((prevDetails) => ({
              ...prevDetails,
              gallery: [...(prevDetails.gallery || []), ...validCompressedFiles],
            }));
          } catch (error) {
            console.error("Error compressing the images:", error);
          }
        } else {
          // Handle other form input types (non-file fields)
          setUpdatedDetails({
            ...updatedDetails,
            [name]: value ? value : currentUser[name],
          });
        }
      };
      
    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsUpdated(!isUpdated);
    }

    useEffect(()=>{
        updateModel();
        console.log(updatedDetails);
        console.log(models)
        console.log(currentUser)
    }, [isUpdated])
    return (
        <div className="form-container">
          <h2>Update your profile</h2>
          {isUpdated? (
            <p>Thank you for updating your profile!</p>
          ) : (
            
            <form className="form-details" onSubmit={(e)=>handleSubmit(e)}>
              <div className="form-elements">
                <h4>{currentUser.name}</h4>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedDetails.name}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>

              <div className="form-elements">
                <h4>{currentUser.lastName}</h4>
                <label htmlFor="lastname">last name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={updatedDetails.lastName}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>
    
              <div className="form-elements">
                <h4>{currentUser.age}</h4>
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={updatedDetails.age}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>

              <div className="form-elements">
                <p>No initial value set</p>
                <label htmlFor="weight">weight (kg):</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={currentUser.weight}
                  onChange={(e)=>handleFormChange(e)}
                    required
                />
              </div>

              <div className="form-elements">
                <p>No initial value set</p>
                <label htmlFor="height">height (cm):</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={currentUser.height}
                  onChange={(e)=>handleFormChange(e)}
                    required
                />
              </div>

              <div className="form-elements">
              <h4>{currentUser.ethinicity}</h4>
                <label htmlFor="ethnicity">Ethnicity:</label>
                <input
                  type="text"
                  id="ethnicity"
                  name="ethnicity"
                  value={currentUser.ethnicity}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>

              <div className="form-elements">
                <p>No initial value was set</p>
                <label htmlFor="bodyMarks">Any Special body marks:</label>
                <input
                  type="text"
                  id="bodyMarks"
                  name="bodyMarks"
                  value={currentUser.bodyMarks}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>
    
              <div className="form-elements">
              <h4>{currentUser.email}</h4>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedDetails.email}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>

              <div className="form-elements">
                <h4>Set new password?</h4>
                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={updatedDetails.password}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>

              <div className="form-elements">
                <h4>{currentUser.street}</h4>
                    <label htmlFor="street">Street:</label>
                    <input
                    type="text"
                    id="street"
                    name="street"
                    value={updatedDetails.street}
                    onChange={(e)=>handleFormChange(e)}
                    />
                </div>

                <div className="form-elements">
                <h4>{currentUser.city}</h4>
                    <label htmlFor="city">City:</label>
                    <input
                    type="text"
                    id="city"
                    name="city"
                    value={updatedDetails.city}
                    onChange={(e)=>handleFormChange(e)}
                    />
                </div>

                <div className="form-elements">
                <h4>{currentUser.province}</h4>
                    <label htmlFor="state">State/Province:</label>
                    <input
                    type="text"
                    id="state"
                    name="state"
                    value={updatedDetails.state}
                    onChange={(e)=>handleFormChange(e)}
                    />
                </div>

                <div className="form-elements">
                <h4>{currentUser.postalCode}</h4>
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={updatedDetails.postalCode}
                    onChange={(e)=>handleFormChange(e)}
                    />
                </div>
                <div className="form-elements">
                <h4>{currentUser.country}</h4>
                    <label htmlFor="country">Country:</label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={updatedDetails.country}
                    onChange={(e)=>handleFormChange(e)}
                    />
                </div>

              <div className="form-elements">
              <h4>{currentUser.portfolio}</h4>
                <label htmlFor="portfolio">Portfolio Link:</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={updatedDetails.portfolio}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>

                {/* <div className="form-elements">
                    <label htmlFor="experience"></label>
                    <select id="experience" name="experience" value="" onChange={(e)=>handleFormChange(e)} required>
                        <option value="" disabled>Select experience level</option>
                        <option value="0-1">Beginner (0-1 year)</option>
                        <option value="1-3">Junior (1-3 years)</option>
                        <option value="3-5">Mid-Level (3-5 years)</option>
                        <option value="5-10">Professional (5-10+ years)</option>
                    </select>
                </div> */}
                <div className="form-elements">
                    <label htmlFor="profilePicture">profile picture:</label>
                    <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    value={updatedDetails.profilePicture}
                    onChange={(e)=>handleFormChange(e)}
                    />
              </div>
              <div className="form-elements">
                <p>Add more images for your gallery</p>
                <label htmlFor="gallery">Profile images:</label>
                <input
                    type="file"
                    id="gallery"
                    name="gallery"
                    onChange={(e) => handleFormChange(e)}
                    multiple
                    required
                    minLength={3}
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                />
            </div>

              <div className="form-elements">
                <p>No initial value</p>
                <label htmlFor="motivation">tell us about you:</label>
                <textarea
                  type="text"
                  id="motivation"
                  name="motivation"
                  value={currentUser.motivation}
                  onChange={(e)=>handleFormChange(e)}
                  required
                  minLength={200}
                  maxLength={500}
                />
              </div> 
              <button className="login-signup-btn"type="submit">Register</button>
            </form>
          )
        }
        <Link to="/">go back home</Link>
    </div>
    )
}

export default UpdateProfile;