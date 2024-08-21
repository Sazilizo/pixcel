import React, {useEffect, useState} from 'react';

const Apply = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName:'',
        age: '',
        email: '',
        street:'',
        postalCode:'',
        state: '',
        city: '',
        country: '',
        portfolio: '',
        experience:'',
    });
    
      // Initialize state for form submission
    const [submitted, setSubmitted] = useState(false);
    
      // Handle form input changes
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
      // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setSubmitted(true);
    };
    console.log(formData.experience);
    useEffect(()=>{
      console.log(formData)
    },[formData])
    return (
        <div className="form-container">
          <h2>Register as a Modeller</h2>
          {submitted ? (
            <p>Thank you for registering!</p>
          ) : (
            <form className="form-details" onSubmit={handleSubmit}>
              <div className="form-elements">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-elements">
                <label htmlFor="lastname">last name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="form-elements">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                />
              </div>
    
              <div className="form-elements">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-elements">
                    <label htmlFor="street">Street:</label>
                    <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="city">City:</label>
                    <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="state">State/Province:</label>
                    <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="form-elements">
                    <label htmlFor="country">Country:</label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    />
                </div>

              <div className="form-elements">
                <label htmlFor="portfolio">Portfolio Link:</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  required
                />
              </div>

                <div className="form-elements">
                    <label htmlFor="experience"></label>
                    <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required>
                        <option value="" disabled>Select experience level</option>
                        <option value="0-1">Beginner (0-1 year)</option>
                        <option value="1-3">Junior (1-3 years)</option>
                        <option value="3-5">Mid-Level (3-5 years)</option>
                        <option value="5-10">Professional (5-10+ years)</option>
                    </select>
                </div>
              <button className="login-signup-btn"type="submit">Register</button>
            </form>
          )}
        </div>
    );
}
    

export default Apply;
