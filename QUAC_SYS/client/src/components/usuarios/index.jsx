import { DashboardContainer } from "../DashboardContaimer";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { api } from "../../services/api";
import "./index.css"
import { Footer } from "../Footer";

export function UserDashboard() {

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    let userId;
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

    
    async function getUserId() {
            
        try {
            const {id} = (await api.get("/users/")).data

            userId = id

        } catch (err) {
           console.log(err); 
        }
    }
    
    getUserId()

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
            <a className="logo-quac-a" href="https://quac-system-front.herokuapp.com"  target="_parent"><p className="logo-titulo-quac">QUAC SYSTEM</p></a>
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
                                            <div className="div-info">
                                                <p className="nome_empresa"><i class="card-icon uil uil-building"></i> {empresa.nome}</p>
                                                <p className="endereco_empresa"><i class="card-icon uil uil-location-point"></i> {empresa.endereco}</p>
                                                <p className="contato_empresa"><i class="card-icon uil uil-phone"></i> {empresa.numero_contato}</p>
                                                <p className="horario_empresa"><i class="card-icon uil uil-clock"></i> {empresa.horario_atendimento}</p>
                                            </div>
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
                                            <div className="div-info">
                                                <p className="nome_empresa"><i class="card-icon uil uil-building"></i> {empresa.nome}</p>
                                                <p className="endereco_empresa"><i class="card-icon uil uil-location-point"></i> {empresa.endereco}</p>
                                                <p className="contato_empresa"><i class="card-icon uil uil-phone"></i> {empresa.numero_contato}</p>
                                                <p className="horario_empresa"><i class="card-icon uil uil-clock"></i> {empresa.horario_atendimento}</p>
                                            </div>
                                                <button className="button_empresa" onClick={() => calcRoute(empresa.id)}>Calcular Rota</button>
                                        </div>
                                    ))
                                }
                            </div>
                    }


            </div>
            <footer className="footer-user">
                <Footer/>
            </footer>
        </>
    );
}


