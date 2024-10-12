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
                    <div className="form-element">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleLoginChange}
                        placeholder="enter your email"
                        required
                        />
                    </div>

                    <div className="form-element">
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleLoginChange}
                        placeholder="enter your password"
                        required
                        />
                    </div>
                    <div className="form-btns">
                        <div className="apply-from-login">
                        {loggedMessage.res === "success"? <p style={{color:"green"}}>{loggedMessage && loggedMessage.msg}</p>: <div><p style={{color:"red"}}>{loggedMessage && loggedMessage.msg}</p> <Link to="/apply">Create account?</Link> </div>}
                        </div>
                        <button className="login-signup-btn small-btn"type="submit" onClick={(e)=>handleLogin(e)}>Log in</button>
                    </div>
                </form>
            </div> 
        </>
       
    );
}

export default Login;