import React, {useEffect, useContext, useState} from "react";
import { formContext } from "../context/UserContext";
import { Link} from "react-router-dom";

//this is for when the model has logged in, this is what they will see
// instead of other profiles
const ModelProfile =()=>{
    const {currentUser} = useContext(formContext);
    return(
    <div className="model-details-page--wrapper">
                    <div className="model-details--wrapper">
                        <div className="model-name--wrapper">
                                <h1 className="model-details-heading">{currentUser?.name +" "+ currentUser?.lastName}</h1>
                            <Link to={`/models/${currentUser.id}/update-profile`}>update profile</Link>
                        </div>
                            <div className="models-details--profile">
                                <img className="model-image"src={currentUser?.profilePicture} alt={currentUser?.name +" "+ currentUser?.lastName}/>
                            </div>
                            <div className="model-details-wrapper">
                                <p>country:{currentUser?.location.country}</p>
                                <p>province/state:{currentUser?.location.province}</p>
                                <p>city:{currentUser?.location.city}</p>
                                <p>experience:{currentUser?.experience} years</p>
                                <p>weight:{currentUser?.weight} kg</p>
                                <p>height:{currentUser?.height} cm</p>
                                {currentUser?.gender === "F"? <p>breast size: {currentUser?.breastSize}</p>:""}
                                <div className="model-contacts">
                                    
                                </div>
                            </div>
                            <div className="model-details--motivation">
                                <p>{currentUser?.motivation}</p>
                            </div>
                            <div className="model-details--gallery">
                                {currentUser?.gallery.map((image, idx) => (
                                <div key={idx} className="gallery-item">
                                    <img src={image} alt={`${currentUser?.name}'s gallery images`} className="gallery-image" />
                                </div>
                                ))}
                            </div>
                    </div>
    </div>
    )
};

export default ModelProfile;