import React from "react";
import "./index.css"
import { useState } from "react";
import authServices from "../../services/authServices";
import { useHistory } from "react-router-dom";
import {api} from '../../services/api'
import { Footer } from "../Footer";

export function LoginAndRegister() {
    
    //Login partition
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory()

    async function handleSubmit(e) {
        
        e.preventDefault()

        try {
            const login = await authServices.signIn(email, password);     

            userRedirect(login)
            
        } catch (err) {
            setError(err.message);
        }
    }

    function userRedirect(idUser) {
        
        history.push(`/dashboard/?userId=${idUser}`)

    }
    //end partition


    const [nameRegister, setNameRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [phoneRegister, setPhoneRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    
    async function handleSubmitRegister(e) {
        
        e.preventDefault()

        const data = { nameRegister, emailRegister, phoneRegister, passwordRegister, role: "user" }

        console.log(data);

        

        const response = await api.post('/users', data);

        if(response.status===201){

            alert("Usuário cadastrado com sucesso")

            
        }else{
            alert("Erro ao cadastrar usuário")
        }
    }

    return (
        <>

            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                        <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Login</span><span>Cadastrar</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"></input>
                                <label for="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-5 pb-3">Login</h4>
                                                    { error && <p className="error">{error}</p> }
                                                    <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <input type="email" name="logemail" className="form-style" placeholder="Seu e-mail" id="logemail" autocomplete="off" value={email} onChange={e => setEmail(e.target.value)} required/>
                                                        <i className="input-icon-login uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpass" className="form-style" placeholder="Sua senha" id="logpass" autocomplete="off" value={password} onChange={e => setPassword(e.target.value)} required/>
                                                        <i className="input-icon-login uil uil-lock-alt"></i>
                                                    </div>
                                                    <div className="fyp">
                                                        <p><a href="#">esqueceu a senha?</a></p>
                                                    </div>
                                                    <button className="btn mt-4">Entrar</button>
                                                    </form>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Cadastro</h4>
                                                    <form className="form-signup" onSubmit={(e) => handleSubmitRegister(e)}>
                                                    <div className="form-group">
                                                        <input type="text" name="logname" className="form-style" placeholder="Nome completo" id="logname" autocomplete="off" value={nameRegister} onChange={e => setNameRegister(e.target.value)} required/>
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" name="logfone" className="form-style" placeholder="Telefone" id="logfone" autocomplete="off" value={phoneRegister} onChange={e => setPhoneRegister(e.target.value)} required/>
                                                        <i className ="input-icon uil uil-phone"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="logemail" className="form-style" placeholder="E-mail" id="logemail" autocomplete="off" value={emailRegister} onChange={e => setEmailRegister(e.target.value)} required/>
                                                        <i className ="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpass" className="form-style" placeholder="Senha" id="logpass" autocomplete="off" value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)} required/>
                                                        <i className ="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                        <button className="btn mt-4">Salvar</button>
                                                    </form>
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
            <footer>
                <Footer/>
            </footer>
        </>
    )
}