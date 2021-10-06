import "./index.css"
import { useHistory } from "react-router-dom";
import { DashboardContainer } from "../../components/DashboardContaimer"
import React, { useEffect, useState } from 'react';
import { api } from "../../services/api";
import "./index.css"


export function DevDashboard() {
    const history = useHistory();
    const goCadastrarEmpresa = () => history.push('./CadastrarEmpresas');
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

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

        const data = { nome, endereco, latitude, longitude, horario_atendimento, numero_contato }

        try {

            const response = await api.put(`/developer/${idEmpresa}`, data);

            if (response.status === 201) {

                alert("Empresa atualizada com sucesso!!")

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

            <DashboardContainer />

            <div className="admin-container">
                <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
                <button
                    className="btn"
                    onClick={goCadastrarEmpresa}>
                    Cadastrar empresa
                </button>

                <div className="usercontainer">

                    <div className="form-group">
                        <div className="col-xs-4">
                            <input className="imputestabelecimento" type="text" id="to" placeholder="Digite o estabelecimento" onChange={(e) => setText(e.target.value)} />
                        </div>
                    </div>

                    <div>
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
                </div>
            </div>

            <div className="Modal_Emp" style={{ display: "None" }}>
                <div className="modalContent">

                    <form className="formulario" onSubmit={handleSubmit} >

                        <label htmlFor="name" >Nome:</label> <br />
                        <input className="name" type="text" />

                        <label htmlFor="endereco">Endereço:</label><br />
                        <input className="endereco" type="text" />

                        <label htmlFor="contato">Contato:</label><br />
                        <input className="contato" type="text" />

                        <label htmlFor="atendimento">Atendimento:</label><br />
                        <input className="atendimento" type="text" />

                        <label htmlFor="latitude">Latitude:</label><br />
                        <input className="latitude" type="text" />

                        <label htmlFor="longitude"> Longitude:</label><br />
                        <input className="longitude" type="text" />

                        <br />
                        <button className="salvarBtn">Salvar</button>


                    </form>

                    <button className="btnsalvar" onClick={() => { closeModal() }}>Cancelar</button>
                </div>
            </div>
        </>
    );
}