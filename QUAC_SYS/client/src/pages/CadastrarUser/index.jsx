import React, { useState } from 'react'
import {api} from '../../services/api'


export  function UsuarioCadastrar() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        const data = { name, email, phone, password, role: "user" }

        console.log(data);

        const response = await api.post('/users', data);

        if(response.status===201){

            alert("Usuário cadastrado com sucesso")

            window.location.replace("/");
        }else{
            alert("Erro ao cadastrar usuário")
        }
    }
    
    function Cancel() {
        window.location.replace("/");
    }
    return (
        <>
        <button onClick={Cancel}>Cancelar</button>
        <div>
            <main>
                <div>                    
                        <h2>Cadastro de usuário</h2>
<<<<<<< HEAD:QUAC_SYS/client/src/pages/cadastrar/index.jsx
                        <label  htmlFor="text">Nome:</label>
                        <input  className="imputname" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" required/>
                        <label htmlFor="text">Email:</label>
                        <input  className="imputemail" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" required/>
                        <label htmlFor="text">Telefone:</label>
                        <input  className="imputtelefone" type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" required/>
                        <label htmlFor="text">Senha:</label>
                        <input  className="imputsenha"  type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required/>
                        <div>
                            <button 
                            onClick={handleSubmit}>
                                Salvar
                            </button>
                        </div>
                    
=======

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="text">Nome:</label>
                            <input  className="imputname" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" required/>
                            <label htmlFor="text">Email:</label>
                            <input className="imputemail"  type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" required/>
                            <label htmlFor="text">Telefone:</label>
                            <input  className="imputtelefone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" required/>
                            <label htmlFor="text">Senha:</label>
                            <input className="imputsenha" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required/>
                            <div>
                                <button>Salvar</button>
                            </div>
                        </form>                                                                        
>>>>>>> 61b0b42c34e893e30a23a15f93b4e27769251941:QUAC_SYS/client/src/pages/CadastrarUser/index.jsx
                </div>
            </main>

        </div>
    </>
    )
};
