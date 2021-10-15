import React, { useState } from 'react'
import { ReturnDeshboard } from '../../components/ReturnButton';
import { api } from '../../services/api'
import "./index.css"


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
        <a className="logo-quac-a" href="http://localhost:3000/"  target="_parent"><p className="logo-titulo-quac">QUAC SYSTEM</p></a>
            <h2 className="titulo_cadastro">Cadastro da empresa</h2>

            <form onSubmit={handleSubmit}>
                <div className="div-form">
                    <label className="label_cadastro" htmlFor="text">
                        Nome: <br />
                        <input className="imput" type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: DWAYEL Tech" required />
    <br />          </label>

                    <label className="label_cadastro" htmlFor="text">
                        Endereço: <br />
                        <input  className="imput" type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Ex: Rua Duque de Caxias" required />
    <br />          </label>

                    <label className="label_cadastro" htmlFor="text">
                        Atendimento: <br />
                        <input className="imput" type="" value={horario_atendimento} onChange={e => setHorario_atendimento(e.target.value)} placeholder="Ex: 08h00 - 12h00 / 13h30 - 17h30" required />
    <br />          </label>

                    <label className="label_cadastro" htmlFor="text">
                        Telefone: <br />
                        <input className="imput" type="tel" value={numero_contato} onChange={e => setNumero_contato(e.target.value)} placeholder="Ex: (47) 9 9999-9999" required />
    <br />          </label>

                    <label className="label_cadastro" htmlFor="text">
                        Latitude: <br />
                        <input className="imput" type="text" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Ex: -26.819800" required />
    <br />          </label>

                    <label className="label_cadastro" htmlFor="text">
                        Longitude: <br />
                        <input className="imput" type="text" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Ex: -49.273357" required />
    <br />          </label>

                    <label className="label_cadastro" htmlFor="text">
                        Email: <br />
                        <input className="imput" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ex: email@email.com" required />
    <br />          </label>

                    <label className="label_cadastro"htmlFor="text">
                        Senha: <br />
                        <input className="imput" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required />
    <br />          </label>

                </div>
                <button className="btnsalvar"  >Salvar</button>

            </form>
        </div>
        
        </>
    )
};