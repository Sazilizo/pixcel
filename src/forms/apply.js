import React, {useContext, useEffect, useState,useRef } from 'react';
import {Link, Navigate, useFormAction} from "react-router-dom";
import { formContext } from '../context/UserContext';
import {useForm} from "react-hook-form";

const Apply = () => {
    // const {handleApplyFormChange,handleSubmit, models,submitted} = useContext(formContext);
    const { handleModelSubmit,setFile } = useContext(formContext);
    const [images, setImages]= useState([]) 
    const { register, handleSubmit: handleFormSubmit, setValue, formState: { errors, isSubmitted, isSubmitting } } = useForm();
    const textareaRef = useRef(null);
  

    
    // Handler for profile picture upload
    const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];  // Single file for profile picture
      setImages((prevState) => ({
        ...prevState,
        profilePicture: file,  // Set the profile picture
      }));
    };
    
    // Handler for multiple images upload
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);  // Convert FileList to Array
      setImages((prevState) => ({
        ...prevState,
        otherImages: files,  // Set the array of selected images
      }));
    };
    const onSubmit = (data) => {
      console.log(data);
      handleModelSubmit(data); 
    };
    useEffect(()=>{
      console.log("images",images);
      setFile(images)
    },[images])
    return (
        <div className="form-container">
          {isSubmitting? <p>Creating an account</p>:(<>
          <h2>Apply with your details here</h2>
          <form className="form-details" onSubmit={handleFormSubmit(onSubmit)}>
            <div className="form-left-half">
              <div className="form-element">
                <input {...register("name", 
                  {required:"name is required",
                  minLength:
                    {value:2 , 
                    message:"name must be at least 2 letters long"
                  }})} type="text" placeholder="enter your name"></input>
                {errors.name && <p style={{"color":"red"}}>{errors.name.message}</p>}
              </div>
              <div className="form-element">
                <input type="text" {...register("lastName",
                {required:"Please Enter your last name",
                  minLength:{
                    value:2,
                    message:"must be at least 2 letters long"
                  }
                })}
                placeholder="enter your last name"></input>
                {errors.lastName && <p style={{"color":"red"}}>{errors.lastName.message}</p>}
              </div>
              <div className="form-element">
                  <input {...register("age", {required: "Please Enter an age older than 17 years"})} placeholder="please enter your age"max={90} min={18}type="number"></input>
                  {errors.age && <p style={{"color":"red"}}>{errors.age.message}</p>}
                </div>
              <div className="form-element">
                <input {...register("email", {required:"email is required",
                  pattern:{
                    value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Email is not valid"
                  }
                })} placeholder="username@host.com"></input>
                {errors.email && <p style={{"color":"red"}}>{errors.email.message}</p>}
              </div>
              <div className="form-element">
                <input {...register("password", {required:"Please Enter your password", 
                  pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]{8,}$/, 
                  message:"password must 8 characters long, have A capital letter and numbers, no spaces"}})}placeholder="please type your password" type="password"></input>
                  {errors.password && <p style={{"color":"red"}}>{errors.password.message}</p>}
              </div>
              <div className="form-element">
                <select {...register("gender", {required:true})}>
                  <option disabled value="">Select Gender</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
                {errors.gender && <p style={{"color":"red"}}>This field cannot be empty</p>}
              </div>
              <div className="form-element">
                <select {...register("ethnicity", {required:true})}>
                  <option disabled value="">Select your ethnicity</option>
                  <option value="Aborigine">Aborigine</option>
                  <option value="African">African</option>
                  <option value="American(native)">American(native)</option>
                  <option value="Asian">Asian(native)</option>
                  <option value="European">European</option>
                  <option value="Indian">Indian</option>
                  <option value="Maori">Maori</option>
                </select>
                {errors.gender && <p style={{"color":"red"}}>This field cannot be empty</p>}
              </div>
              <div className="form-element">
                <input type="number" {...register("height", {required:"Please enter your height"})} placeholder="enter your height"></input>
                {errors.height && <p style={{"color":"red"}}>{errors.height.message}</p>}
              </div>
              <div className="form-element">
                <input type="number" {...register("weight", {required:"Please enter your weight"})} placeholder="enter your weight"></input>
                {errors.weight && <p style={{"color":"red"}}>{errors.weight.message}</p>}
              </div>
              <div className="form-element">
                <input type="number" {...register("breast", {required:"Please enter your breast size"})} placeholder="enter your breast size"></input>
                {errors.breast && <p style={{"color":"red"}}>{errors.breast.message}</p>}
              </div>
              <div className="form-element">
                <input {...register("nationality",{required:"Please enter your nationality"})} placeholder="please provide your nationality"></input>
                {errors.nationality && <p style={{"color":"red"}}>{errors.nationality.message}</p>}
              </div>
              <div className="form-element">
                <input {...register("province",{required:"Please enter your state/province"})} placeholder="please provide your state/province"></input>
                {errors.province && <p style={{"color":"red"}}>{errors.province.message}</p>}
              </div>
              <div className="form-element">
                <input {...register("city",{required:"Please enter your city"})} placeholder="please provide your city"></input>
                {errors.city && <p style={{"color":"red"}}>{errors.city.message}</p>}
              </div>
              <div className="form-element">
                <input {...register("street",{required:"Please enter your street"})} placeholder="please provide your street"></input>
                {errors.street && <p style={{"color":"red"}}>{errors.street.message}</p>}
              </div>
              <div className="form-element">
                <input {...register("postalCode",{required:"Please enter your postal code"})} placeholder="please provide your postal code"></input>
                {errors.postalCode && <p style={{"color":"red"}}>{errors.postalCode.message}</p>}
              </div>
            </div> 
            <div className="form-right-half">
              <div className="form-element">
                <label htmlFor="portfolio">Portfolio link</label>
                  <input type="url" {...register("portfolio", 
                  {required:"Please Enter your portfolio",
                    pattern: {
                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/,
                    message: "Invalid URL format"
                }})}
                placeholder="i.e https://link.com"></input>
              </div>
              <div className="form-element">
                <label htmlFor="facebook">Facebook link</label>
                  <input type="url" {...register("facebook", 
                  {
                    pattern: {
                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/,
                    message: "Invalid URL format"
                }})}
                placeholder="i.e https://facebook.com/username"></input>
                {errors.facebook && <p style={{"color":"red"}}>{errors.facebook.message}</p>}
                </div>
                <div className="form-element">
                  <label htmlFor="twitter">X/Twitter link</label>
                  <input type="url" {...register("twitter", 
                  {
                    pattern: {
                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/,
                    message: "Invalid URL format"
                  }})}
                  placeholder="i.e https://x.com/username"></input>
                  {errors.twitter && <p style={{"color":"red"}}>{errors.twitter.message}</p>}
                </div>
                <div className="form-element">
                  <label htmlFor="instagram">Instagram Link</label>
                  <input type="url" {...register("instagram", 
                  {
                    pattern: {
                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/,
                    message: "Invalid URL format"
                  }})}
                  placeholder="i.e https://instagram.com/username"></input>
                  {errors.instagram && <p style={{"color":"red"}}>{errors.instagram.message}</p>}
                </div>
                <div className="form-element">
                  <label htmlFor="tiktok">Tiktok</label>
                  <input type="url" {...register("tiktok", 
                  {
                    pattern: {
                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/,
                    message: "Invalid URL format"
                  }})}
                  placeholder="i.e https://tiktok.com/username"></input>
                  {errors.tiktok && <p style={{"color":"red"}}>{errors.tiktok.message}</p>}
                </div>
                <div className="form-element">
                  <p>pigmentations, scars and any skin conditions or special markings could be important in your selection for unique campains</p>
                  <textarea {...register("specialMarking")} 
                  // style={{ resize: 'none', overflow: 'hidden' }}
                  placeholder="Please let us know of any special markings, like birth marks or scars or pigmentations"></textarea>
                </div>
                <div className="form-element">
                  <textarea 
                    {...register("motivation", {
                      required: "Please let us know a little about yourself",
                      minLength: {
                        value: 50,
                        message: "Please enter a minimum of 250 characters"
                      }
                    })} 
                    placeholder="Tell us a little about yourself"
                  ></textarea>
                  {errors.motivation && <p style={{ color: "red" }}>{errors.motivation.message}</p>}
                  {/* <p>{motivationValue.length}/250 characters</p> Show character count */}
                </div>
                <div className="form-element">
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleProfilePictureChange}
                />
              </div>
                <div className="form-element">
                  <input
                    name="gallery"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    onChange={handleFileChange} 
                  />
              </div>
              <button onClick={handleFormSubmit} className="login-signup-btn"type="submit">Submit</button>
            </div>
          </form>
          </>)}
          {/* <Link to="/">Go Back Home</Link> */}
        </div>
    );
}
    

export default Apply;
