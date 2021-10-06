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

        
    }
    return (
        <DashboardContainer>
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
        </DashboardContainer>
    );
}