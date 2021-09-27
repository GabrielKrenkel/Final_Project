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
            await api.delete(`/empresas/${idEmpresa}`);

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

        let Modal = document.querySelector(".Modal_Emp")
        
        Modal.style = "display:block"
    }

    function closeModal(params) {
        
        let Modal = document.querySelector(".Modal_Emp")
        
        Modal.style = "display:none"
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
                            <tbody> 
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
                
                <form>
                    <label htmlFor="name" >
                        Nome:
                        <input className="name"  type="text" />
                    </label>

                    <label htmlFor="endereco">
                        Endereço:
                        <input className="endereco" type="text" />
                    </label>

                    <label htmlFor="contato">
                        Contato:
                        <input className="contato" type="text" />
                    </label>

                    <label htmlFor="atendimento">
                        Horario de Atendimento:
                        <input className="atendimento" type="text" />
                    </label>

                    <label htmlFor="latitude">
                        Latitude:
                        <input className="latitude" type="text" />
                    </label>

                    <label htmlFor="longitude">
                        longitude:
                        <input className="longitude" type="text" />
                    </label>

                    <button>Salvar</button> 
                    
                    
                </form>

                <button onClick={() => {closeModal()}}>Cancelar</button>
            </div>
        </>
    );
}