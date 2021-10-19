import { useState, useEffect } from "react";
import { DashboardContainer } from "../../components/DashboardContaimer"
import { api } from "../../services/api";
import { socket } from "../../services/chat";
import { useHistory } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { ModalError } from '../../components/ModalError';
import "./index.css"

export function Moderador() {

    const history = useHistory();
    let empId;
    const goMostrarSenha = () => history.push(`/MostrarSenha/?empId=${empId}`);
    const [senha, setSenha] = useState("")

    const [empresaName, setEmpresas] = useState("")
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false)

    async function getUserId() {

        try {
            const { id } = (await api.get("/users/")).data

            empId = id

        } catch (err) {
            console.log(err);
        }
    }

    getUserId()

    useEffect(() => {

        let empresaId;

        async function getEmpId() {

            try {
                const { id } = (await api.get("/users/")).data

                empresaId = id

                getEmpresa();

                socket.connect();

                socket.emit("join queue", empresaId);

                socket.emit("create queue", empresaId)

            } catch (err) {

                console.log(err);
            }
        }


        async function getEmpresa() {

            try {
                const empresas = (await api.get(`/empresas/${empresaId}`)).data;

                setEmpresas(empresas.nome);

                getTicket()
            } catch (err) {
                console.log(err);
            }


        }

        getEmpId()


        async function getTicket() {

            try {

                const ticket = (await api.get(`/ticket/last/${empresaId}`)).data

                setSenha(ticket.ticket)

                socket.emit("next ticket", ticket);

                

            } catch (err) {

                console.log(err);
            }
        }

        setLoading(false);

        return () => {
            socket.disconnect()
        }
    }, []);

    async function getSenha(senha) {

        const empresaId = empId

        const numTicket = senha

        try {

            const ticket = (await api.put(`/ticket/funcionario/${empresaId}/${numTicket}`)).data

            if (ticket === null) {
                return setShowModal(true)
            }

            setSenha(numTicket)

            socket.emit("next ticket", ticket);

        } catch (err) {

            console.log(err);

        }


    }

    async function getFirstTicket() {

        const empresaId = empId

        try {

            const ticket = (await api.get(`/ticket/next/${empresaId}`)).data

            getSenha(ticket)

        } catch (err) {

            console.log(err);
        }
    }

    return (
        <>
            {
                showModal &&

                <ModalError onClose={setTimeout(() => { setShowModal(false) }, 900)}>

                    <strong><p className="text-alert">Não a mais usuarios para chamar!</p></strong>

                </ModalError>
            }

            {
                loading ?

                    <p>carregando...</p> :

                    <>
                        
                        <div>
                        <DashboardContainer />
                            <div className="user-container">
                                <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
                                <h1 className="senhaatual">Senha atual:</h1>
                                <div>
                                    <div className="content_card">
                                        <div>
                                            <p className="imgpato"></p>
                                        </div>

                                        <div>
                                            <h2 className="senha">{+senha}</h2>
                                        </div>
                                    </div>
                                </div>

                                <p >{empresaName}</p>
                            </div>
                            <div className="buttons">

                                <button className="btn" onClick={() => getFirstTicket()}>Proxima</button>

                                <button className="btn" onClick={goMostrarSenha}>Tela Mostrar Senha</button>
                            </div>
                        </div>
                        
                        <footer className="footer-mod">
                            <Footer />
                        </footer>
                    </>
            }

        </>
    );
}