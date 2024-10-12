import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { formContext } from '../context/UserContext';
import Contacts from '../footer/contacts';

const ModelDetails = () => {
    const {models} = useContext(formContext);
    const {id} = useParams();

    // finding the model with the id equalling usParams's
    const model = models.filter((model)=> model.id === id);
    console.log(useParams());
    console.log(models)
  return (
    <div className="model-details-page--wrapper">
        {
            model && model.map((modelData)=>{
                console.log("modelData",modelData.location.country)
                return (
                    <div key={id} className="model-details--wrapper">
                        <div className="model-name--wrapper">
                                <h1 className="model-details-heading">{modelData.name +" "+ modelData.lastName}</h1>
                        </div>
                            <div className="models-details--profile">
                                <img className="model-image"src={modelData.profilePicture} alt={modelData.name +" "+ modelData.lastName}/>
                            </div>
                            <div className="model-details-wrapper">
                                <p>country:{modelData.location.country}</p>
                                <p>province/state:{modelData.location.province}</p>
                                <p>city:{modelData.location.city}</p>
                                <p>experience:{modelData.experience} years</p>
                                <p>weight:{modelData.weight} kg</p>
                                <p>height:{modelData.height} cm</p>
                                {modelData.gender === "F"? <p>breast size: {modelData?.breastSize}</p>:""}
                                <div className="model-contacts">
                                    <Contacts/>
                                </div>
                            </div>
                            <div className="model-details--motivation">
                                <p>{modelData.motivation}</p>
                            </div>
                            <div className="model-details--gallery">
                                {modelData.gallery && modelData.gallery.map((image, idx) => (
                                <div key={idx} className="gallery-item">
                                    <img src={image} alt={`${modelData.name}'s gallery images`} className="gallery-image" />
                                </div>
                                ))}
                                {/* <div className="gallery-item">

                                </div>
                                <div className="gallery-item">
                                    
                                </div>
                                <div className="gallery-item">
                                    
                                </div>
                                <div className="gallery-item">
                                    
                                </div>
                                <div className="gallery-item">
                                    
                                </div>
                                <div className="gallery-item">
                                    
                                </div>
                                <div className="gallery-item">
                                    
                                </div>
                                <div className="gallery-item">
                                    
                                </div> */}
                            </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ModelDetails