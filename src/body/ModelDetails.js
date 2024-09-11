import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { formContext } from '../context/UserContext';

const ModelDetails = () => {
    const {models} = useContext(formContext);
    const {id} = useParams();

    // finding the model with the id equalling usParams's
    const model = models.filter((model)=> model.id === parseInt(id));
    console.log(useParams());
  return (
    <div className="model-details-page--wrapper">
        {
            model && model.map((modelData)=>{
                return (
                    <div key={id} className="model-details--wrapper">
                        <div className="model-name--wrapper">
                                <h1 className="model-details-heading">{modelData.name +" "+ modelData.lastName}</h1>
                        </div>
                        <div className="model-details--top-wrapper">
                            <div className="models-details--top-wrapper--profile">
                                <img src={modelData.profilePicture} alt={modelData.name +" "+ modelData.lastName}/>
                            </div>
                            <div className="model-details-top-wrapper-details">
                                <p>country:{modelData.country}</p>
                                <p>province/state:{modelData.province}</p>
                                <p>city:{modelData.city}</p>
                                <p>experience:{modelData.experience} years</p>
                                <p>weight:{modelData.weight} kg</p>
                                <p>height:{modelData.height} cm</p>
                                {modelData.gender === "f"? <p>breast size: {modelData?.breastSize}</p>:""}
                            </div>
                            <div className="model-details--motivation">
                                <p>{modelData.motivation}</p>
                            </div>
                        </div>
                        <div className="model-details--bottom-wrapper">
                            <div className="model-details--gallery">
                                {modelData.gallery && modelData.gallery.map((image, idx) => (
                                <div key={idx} className="gallery-item">
                                    <img src={image} alt={`${modelData.name}'s gallery images`} className="gallery-image" />
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ModelDetails