import { useState } from "react";
import authServices from "../../services/authServices";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await authServices.signIn(email, password);            
            window.location.replace("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container-login">
            <h2 className="logintitle">Login</h2>
            <form className="loginform" onSubmit={handleSubmit}>   
                { error && <p className="error">{error}</p> }
                <label className="labelemail">
                    Email
                    <input  type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label> 
                <label className="labelsenha"> 
                    Senha
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label >       
                <button>login</button>
            </form>
            
        </div>
    );
}