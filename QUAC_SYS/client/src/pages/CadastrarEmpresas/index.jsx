import React, { useState } from 'react'
import { ReturnDeshboard } from '../../components/ReturnButton';
import { api } from '../../services/api'

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

        const response = await api.post('/empresas', data);

        if (response.status === 201) {

            alert("Empresa cadastrada com sucesso")

            window.location.replace("/");
        } else {
            alert("Erro ao cadastrar empresa")
        }
    }
    return (
        <>
        <ReturnDeshboard/>
        <div>
            <h2>Cadastro de empresa</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Nome:</label>
                <input class="imputesstabelecimento" type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" required />

                <label htmlFor="text">Endereço:</label>
                <input  class="imputendereco" type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço da empresa" required />

                <label htmlFor="text">Horário de atendimento</label>
                <input class="imputhorario" type="" value={horario_atendimento} onChange={e => setHorario_atendimento(e.target.value)} placeholder="Horário de atendimento" required />

                <label htmlFor="text">Telefone:</label>
                <input class="imputtelefone" type="tel" value={numero_contato} onChange={e => setNumero_contato(e.target.value)} placeholder="Telefone" required />

                <label htmlFor="text">Latitude:</label>
                <input class="imputlatitude" type="text" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required />

                <label htmlFor="text">Longitude:</label>
                <input class="imputlongitude" type="text" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required />

                <label htmlFor="text">Email:</label>
                <input class="imputemail" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" required />

                <label htmlFor="text">Senha:</label>
                <input class="imputsenha" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a senha" required />

                <button>Salvar</button>
            </form>
        </div>
        
        </>
    )
};