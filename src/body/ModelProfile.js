import React, {useEffect, useContext, useState} from "react";
import { formContext } from "../context/UserContext";
import { Link } from "react-router-dom";
//this is for when the model has logged in, this is what they will see
// instead of other profiles
const ModelProfile =()=>{
    const {currentUser} = useContext(formContext);
    return(
        <div className="current-user--wrapper">
            <div className="current-user__image-wrapper">
                <img className="model-image" src={currentUser.profilePicture} alt="model profile"></img>
            </div>
            <div className="current-user__primary-description">
                <div className="current-user__names">
                    <h1 className="current-user__names--heading">{`${currentUser.name} ${currentUser.lastName}`}</h1>
                </div>
                <div className="current-user__features">
                    <h4>weight:{currentUser.weight}</h4>
                    <h4>height:{currentUser.height}</h4>
                    {currentUser.gender === "F"?<h4>breast size:</h4> :""}
                </div>
                <div className="current-user__location-experience">
                    <h4 className="current-user__location__heading">Country: {currentUser.location.country}</h4>
                    <h4 className="current-user__experience__heading">experience: {currentUser.exprerience} years</h4>
                </div>
            </div>
            <div className="current-user__self-description--wrapper">
                <p className="current-user__self-description-text">
                    {currentUser?.motivation}
                </p>
            </div>
            <div className="current-user__gallery-wrapper">
                <div className="current-user__gallery">
                    {currentUser?.gallery && currentUser.gallery.map((images,idx)=>{
                        return <img key={idx} src={images} alt={`${currentUser.name}'s gallery images`} width={200} height={300}></img>
                    }) }
                </div>
            </div>

            <div className="update-details-btn">
                <Link to="/update-profile">update profile</Link>
            </div>
        </div>
    );
};

export default ModelProfile;