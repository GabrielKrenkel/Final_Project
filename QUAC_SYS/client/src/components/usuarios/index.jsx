import { DashboardContainer } from "../DashboardContaimer";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { api } from "../../services/api";
import "./index.css"

export function UserDashboard() {

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    let paramBusca = new URLSearchParams(window.location.search);
 
    const userId = paramBusca.get("userId");

    const history = useHistory();

    function calcRoute(empresaName) {

        history.push(`/VerificaDistancia/?userId=${userId}&lat=${latitude}&lon=${longitude}&empId=${empresaName}`);
    };

    

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

        const successCallback = (position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        }
    
        const errorCallback = (error) => {
            console.error(error);
        }
    
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
        
    }, []);

    const [text, setText] = useState("");
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

    useEffect(() => {

        const textToLowerCase = text.toLowerCase();
        let filteredList = empresas.filter(empresa => {
            if (text) {
                return empresa.nome.toLowerCase().includes(textToLowerCase) ||
                    empresa.endereco.toLowerCase().includes(textToLowerCase);
            }
            return false;
        });

        setFilteredEmpresas(filteredList.slice(0, 5));
    }, [text, empresas]);


    return (
        <>
        <DashboardContainer/>
            <div className="usercontainer">
            <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
                <div className="form-group">
                    <h1>Escolha o estabelecimento</h1>
                    <label htmlFor="to" className="paraOndeLabel"></label>
                    <div className="col-xs-4">
                        <input className="imputestabelecimento" type="text" id="to" placeholder="Digite o estabelecimento" onChange={(e) => setText(e.target.value)}/>
                    </div>
                </div>


                {
                    (text === "") ?

                        loading ?

                            <p>Carregando...</p> :
                            
                            <div className="empresas">
                                {
                                    empresas.map(empresa => (
                                        <div key={empresa.id} className="card">
                                            <p className="nome_empresa">Nome: {empresa.nome}</p>
                                            <p className="endereco_empresa">Endereço: {empresa.endereco}</p>
                                            <p className="contato_empresa">Contato: {empresa.numero_contato}</p>
                                            <p className="horario_empresa">Horario De Atendimento: {empresa.horario_atendimento}</p>
                                            <button className="button_empresa" onClick={() => calcRoute(empresa.id)}>Calcular Rota</button>
                                        </div>
                                    ))
                                }
                            </div> :

                        loading ?

                        <p>Carregando...</p> :

                            <div className="empresas">
                                {
                                    !!filteredEmpresas.length &&
                                    filteredEmpresas.map(empresa => (
                                        <div key={empresa.id} className="card">
                                            <p className="nome_empresa">Nome: {empresa.nome}</p>
                                            <p className="endereco_empresa">Endereço: {empresa.endereco}</p>
                                            <p className="contato_empresa">Contato: {empresa.numero_contato}</p>
                                            <p className="horario_empresa">Horario De Atendimento: {empresa.horario_atendimento}</p>
                                            <button className="button_empresa" onClick={() => calcRoute(empresa.id)}>Calcular Rota</button>
                                        </div>
                                    ))
                                }
                            </div>
                    }


            </div>
        </>
    );
}


