import React from "react";
import "./index.css"
import { useState } from "react";
import authServices from "../../services/authServices";
import image from "./quac.png"

export function LoginAndRegister() {
    
    //Login partition
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit() {
        
        try {
            await authServices.signIn(email, password);     
                   
            window.location.replace("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    }
    //end partition


    return (
        <>
            <a href="http://localhost:3000/" className="logo" target="_parent">
                {/* <img src="https://dc737.4shared.com/img/V14pLOcyea/s24/17c3d8248e8/QAC?async&rand=0.8932856227083548" className="logo" alt="" /> */}
                <img src={image} className="logo" alt="" />
            </a>

            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"></input>
                                <label for="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    { error && <p className="error">{error}</p> }
                                                    <div className="form-group">
                                                        <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off" value={email} onChange={e => setEmail(e.target.value)} required/>
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" value={password} onChange={e => setPassword(e.target.value)} required/>
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn mt-4" onClick={handleSubmit}>Submit</button>
                                                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autocomplete="off"/>
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" name="logfone" className="form-style" placeholder="Your Fone" id="logfone" autocomplete="off"/>
                                                        <i className ="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off"/>
                                                        <i className ="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off"/>
                                                        <i className ="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <a href="#" className="btn mt-4">submit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}