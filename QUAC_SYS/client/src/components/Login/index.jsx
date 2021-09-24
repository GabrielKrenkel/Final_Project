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
<<<<<<< HEAD
        <div className="container-login">
=======
        <div className="containerlogin">
>>>>>>> 61b0b42c34e893e30a23a15f93b4e27769251941
            <h2 className="logintitle">Login</h2>
            <form className="loginform" onSubmit={handleSubmit}>   
                { error && <p className="error">{error}</p> }
                <label className="labelemail">
                    Email
                    <input  type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label> 
<<<<<<< HEAD
                <label className="labelsenha"> 
=======
                <label className="labelsenha">
>>>>>>> 61b0b42c34e893e30a23a15f93b4e27769251941
                    Senha
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label >       
                <button>login</button>
            </form>
            
        </div>
    );
}