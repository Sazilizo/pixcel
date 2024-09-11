import React, { useContext, useEffect, useState } from "react";
import { formContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Login = ()=>{
    const {handleLogin,handleLoginSubmit, handleLoginChange,loggedMessage, isLoggedIn,user} = useContext(formContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(isLoggedIn){
            navigate("/");
            localStorage.setItem("isLoggedIn",  JSON.stringify(isLoggedIn))
        }
    },[isLoggedIn])
    return(
        <>
            <div className="login-form-control">
                <form className="form-details" onSubmit={handleLoginSubmit}>
                    <div className="form-elements">
                        <label htmlFor="email">Email:</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleLoginChange}
                        required
                        />
                    </div>

                    <div className="form-elements">
                        <label htmlFor="password">password:</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleLoginChange}
                        required
                        />
                    </div>
                    <button className="login-signup-btn"type="submit" onClick={(e)=>handleLogin(e)}>Log in</button>
                </form>
                {loggedMessage.res === "success"? <p style={{color:"green"}}>{loggedMessage && loggedMessage.msg}</p>: <div><p style={{color:"red"}}>{loggedMessage && loggedMessage.msg}</p> <Link to="/apply">Create account?</Link> </div>}
            </div> 
        </>
       
    );
}

export default Login;