import React, {useContext, useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import { formContext } from '../context/UserContext';

const Apply = () => {
    const {handleApplyFormChange,handleSubmit, models,submitted} = useContext(formContext);

    return (
        <div className="form-container">
          <h2>Register as a Modeller</h2>
          {submitted ? (
            <p>Thank you for registering!</p>
          ) : (
            <form className="form-details" onSubmit={(e)=>handleSubmit(e)}>
              <div className="form-elements">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={models.name}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                />
              </div>

              <div className="form-elements">
                <label htmlFor="lastname">last name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={models.lastName}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                />
              </div>
    
              <div className="form-elements">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={models.age}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                  min="18"
                />
              </div>

              <div className="form-elements">
                    <label htmlFor="ethnicty">Select your gender</label>
                    <select id="ethnicity" name="ethnicity" value={models.ethnicity} onChange={(e)=>handleApplyFormChange(e)} required>
                        <option value="" disabled>Select yor ethnicity</option>
                        <option value="African">African</option>
                        <option value="Asian">Asian</option>
                        <option value="Native American">American(Americas)</option>
                        <option value="European">European</option>
                        <option value="Aborigene">Aborigene</option>
                        <option value="Maori">Maori</option>
                    </select>
              </div>
            
              <div className="form-elements">
                    <label htmlFor="gender">Select your gender</label>
                    <select id="gender" name="gender" value={models.gender} onChange={(e)=>handleApplyFormChange(e)} required>
                        <option value="" disabled>Select yor gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>

              <div className="form-elements">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={models.email}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                />
              </div>

              <div className="form-elements">
                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={models.password}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                />
              </div>

              <div className="form-elements">
                    <label htmlFor="street">Street:</label>
                    <input
                    type="text"
                    id="street"
                    name="street"
                    value={models.street}
                    onChange={(e)=>handleApplyFormChange(e)}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="city">City:</label>
                    <input
                    type="text"
                    id="city"
                    name="city"
                    value={models.city}
                    onChange={(e)=>handleApplyFormChange(e)}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="state">State/Province:</label>
                    <input
                    type="text"
                    id="state"
                    name="state"
                    value={models.province}
                    onChange={(e)=>handleApplyFormChange(e)}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={models.postalCode}
                    onChange={(e)=>handleApplyFormChange(e)}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="country">Country:</label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={models.country}
                    onChange={(e)=>handleApplyFormChange(e)}
                    required
                    />
                </div>

              <div className="form-elements">
                <label htmlFor="portfolio">Portfolio Link:</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={models.portfolio}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                />
              </div>

                <div className="form-elements">
                    <label htmlFor="experience"></label>
                    <select id="experience" name="experience" value={models.experience} onChange={(e)=>handleApplyFormChange(e)} required>
                        <option value="" disabled>Select experience level</option>
                        <option value="0-1">Beginner (0-1 year)</option>
                        <option value="1-3">Junior (1-3 years)</option>
                        <option value="3-5">Mid-Level (3-5 years)</option>
                        <option value="5-10">Professional (5-10+ years)</option>
                    </select>
                </div>
                <div className="form-elements">
                <label htmlFor="profilePicture">profile picture:</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  value={models.profilePicture}
                  onChange={(e)=>handleApplyFormChange(e)}
                  required
                />
              </div>
              <button className="login-signup-btn"type="submit">Register</button>
            </form>
          )}
          <Link to="/">Go Back Home</Link>
          {submitted? <Navigate replace to="/login"></Navigate>:""}
          
        </div>
    );
}
    

export default Apply;
