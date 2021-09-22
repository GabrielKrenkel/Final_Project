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

        const response = await api.post('/api/users', data);

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

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="text">Nome:</label>
                            <input  type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" required/>
                            <label htmlFor="text">Email:</label>
                            <input  type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" required/>
                            <label htmlFor="text">Telefone:</label>
                            <input  type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" required/>
                            <label htmlFor="text">Senha:</label>
                            <input  type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required/>
                            <div>
                                <button>Salvar</button>
                            </div>
                        </form>                                                                        
                </div>
            </main>

        </div>
    </>
    )
};
