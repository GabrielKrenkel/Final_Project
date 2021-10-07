import React, { useState } from 'react'
import { ReturnDeshboard } from '../../components/ReturnButton';
import { api } from '../../services/api'
import "./styles.css"


export function EmpresaCadastrar() {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [horario_atendimento, setHorario_atendimento] = useState('')
    const [email, setEmail] = useState('');
    const [numero_contato, setNumero_contato] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const data = { nome, endereco, latitude, longitude, horario_atendimento, numero_contato, email, password, role: "moderador" }

        console.log(data);

        try {
            
            const response = await api.post('/developer', data);

            if (response.status === 201) {

                alert("Empresa cadastrada com sucesso")

                window.location.replace("/");

            }

        } catch (err) {
            if (err.response.status === 409) {
                alert('E-mail já cadastrado');
            }else {
                alert("Erro: Tente novamente mais tarde.")
            }
        }
    }
    return (
        <>
        <ReturnDeshboard/>
        <div>
        <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
            <h2>Cadastro da empresa</h2>

            <form onSubmit={handleSubmit}>
<<<<<<< HEAD
                <label htmlFor="text">Nome:</label><br/>
                <input className="imput" type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" required />
<br />
                <label htmlFor="text">Endereço:</label><br/>
                <input  className="imput" type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço da empresa" required />
<br />
                <label htmlFor="text">Atendimento</label><br/>
                <input className="imput" type="" value={horario_atendimento} onChange={e => setHorario_atendimento(e.target.value)} placeholder="Horário de atendimento" required />
<br />
                <label htmlFor="text">Telefone:</label><br/>
                <input className="imput" type="tel" value={numero_contato} onChange={e => setNumero_contato(e.target.value)} placeholder="Telefone" required />
<br />
                <label htmlFor="text">Latitude:</label><br/>
                <input className="imput" type="text" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required />
<br />
                <label htmlFor="text">Longitude:</label><br/>
                <input className="imput" type="text" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required />
<br />
                <label htmlFor="text">Email:</label><br/>
                <input className="imput" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" required />
<br />
                <label htmlFor="text">Senha:</label><br/>
                <input className="imput" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required />
<br />
                <button className="btnsalvar"  >Salvar</button>
=======
                <label htmlFor="text">Nome:</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" required />

                <label htmlFor="text">Endereço:</label>
                <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço da empresa" required />

                <label htmlFor="text">Horário de atendimento</label>
                <input type="" value={horario_atendimento} onChange={e => setHorario_atendimento(e.target.value)} placeholder="Horário de atendimento" required />

                <label htmlFor="text">Telefone:</label>
                <input type="tel" value={numero_contato} onChange={e => setNumero_contato(e.target.value)} placeholder="Telefone" required />

                <label htmlFor="text">Latitude:</label>
                <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required />

                <label htmlFor="text">Longitude:</label>
                <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required />

                <label htmlFor="text">Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" required />

                <label htmlFor="text">Senha:</label>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required />

                <button>Salvar</button>
>>>>>>> estilizacao2
            </form>
        </div>
        
        </>
    )
};