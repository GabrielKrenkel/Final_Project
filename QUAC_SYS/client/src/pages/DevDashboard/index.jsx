import "./index.css"
import { useHistory } from "react-router-dom";
import { DashboardContainer } from "../../components/DashboardContaimer"
import React, { useEffect, useState } from 'react';
import { api } from "../../services/api";


export function DevDashboard() {
    const history = useHistory();
    const goCadastrarEmpresa = () => history.push('./CadastrarEmpresas');
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getEmpresa() {
            try {
                const empresas = (await api.get("/empresas")).data;

                setEmpresas(empresas);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        }

        getEmpresa();
    }, []);

    async function deleteEmp(idEmpresa) {
        try {
            await api.delete(`/developer/${idEmpresa}`);

            const empresasAtualizadas = empresas.filter(empresa => empresa.id !== idEmpresa);

            setEmpresas(empresasAtualizadas);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    }

    async function editEmp(idEmpresa) {

        try {
            const empresa = await api.get(`/empresas/${idEmpresa}`)

            showEmp(empresa)

        } catch (err) {

            console.log(err);

        }

    }

    function showEmp(empresa) {
        
        console.log(empresa.data);

        let nome = document.querySelector(".name")
        let endereco = document.querySelector(".endereco")
        let contato = document.querySelector(".contato")
        let atendimento = document.querySelector(".atendimento")
        let latitude = document.querySelector(".latitude")
        let longitude = document.querySelector(".longitude")

        nome.value = empresa.data.nome
        endereco.value = empresa.data.endereco
        contato.value = empresa.data.numero_contato
        atendimento.value = empresa.data.horario_atendimento
        latitude.value = empresa.data.latitude
        longitude.value = empresa.data.longitude


        showModal(empresa.data.id)
    }

    function showModal(empresaId) {
        let Modal = document.querySelector(".Modal_Emp")
        
        Modal.style = "display:block"

        sessionStorage.setItem("empresaId", empresaId)
    }

    function closeModal() {

        let Modal = document.querySelector(".Modal_Emp")
        
        Modal.style = "display:none"
    }

    async function handleSubmit(e) {
        
        e.preventDefault();

        const idEmpresa = sessionStorage.getItem("empresaId")

        let nome = document.querySelector(".name").value
        let endereco = document.querySelector(".endereco").value
        let numero_contato = document.querySelector(".contato").value
        let horario_atendimento = document.querySelector(".atendimento").value
        let latitude = document.querySelector(".latitude").value
        let longitude = document.querySelector(".longitude").value
        
        const data = { nome, endereco, latitude, longitude, horario_atendimento, numero_contato}

        try {
            
            const response = await api.put(`/developer/${idEmpresa}`, data);

            if (response.status === 201) {
                
                alert("Usuario atualizado com sucesso!!")

                closeModal()
            }

            getEmpresa()



        } catch (error) {

            console.log(error);
        
        }

        setLoading(false);
    }

    async function getEmpresa() {
        try {
            const empresas = (await api.get("/empresas")).data;

            setEmpresas(empresas);

        } catch (err) {

            console.log(err);
        }

        setLoading(false);
    }
    
    return (

        <>

        <DashboardContainer/>

            <div className="admin-container">
                <h1>Página de dev</h1>
                <button
                    onClick={goCadastrarEmpresa}>
                    Cadastrar empresa
                </button>

                {
                    loading ?
                        <p>Carregando...</p> :
                        <table className="empresas">
                             
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Endereço</th>
                                        <th>Telefone</th>
                                        <th>Horário de funcionamento</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                    </tr>
                                </thead>

                            <tbody>   
                                {
                                    empresas.map(empresa => (
                                        <tr key={empresa.id}>
                                            <td>{empresa.nome}</td>
                                            <td>{empresa.endereco}</td>
                                            <td>{empresa.numero_contato}</td>
                                            <td>{empresa.horario_atendimento}</td>
                                            <td>{empresa.latitude}</td>
                                            <td>{empresa.longitude}</td>
                                            <td><button onClick={() => editEmp(empresa.id)}>Editar</button></td>
                                            <td><button onClick={() => deleteEmp(empresa.id)}>Excluir</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }

                
            </div>

                <div className="Modal_Emp" style={ {display: "None"}}>
                
                <form  className="formulario" onSubmit={handleSubmit} >

                    <label htmlFor="name" >
                        Nome:
                        <input className="name"  type="text" />
                    </label>
                <br />
                    <label htmlFor="endereco">
                        Endereço:
                        <input className="endereco" type="text" />
                    </label>
                <br />
                    <label htmlFor="contato">
                        Contato:
                        <input className="contato" type="text" />
                    </label>

<br />
                    <label htmlFor="atendimento">
                        Atendimento:
                        <input className="atendimento" type="text" />
                    </label>
<br />
                    <label htmlFor="latitude">
                        Latitude:
                        <input className="latitude" type="text" />
                    </label>
<br />
                    <label htmlFor="longitude">
                        longitude:
                        <input className="longitude" type="text" />
                    </label>
<br /><br />
                    <button>Salvar</button> 
                    
                    
                </form>
                    <button onClick={() => {closeModal()}}>Cancelar</button>
                
            </div>
        </>
    );
}