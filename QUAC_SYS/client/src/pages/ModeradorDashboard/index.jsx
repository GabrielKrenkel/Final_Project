import { useState, useEffect } from "react";
import { DashboardContainer } from "../../components/DashboardContaimer"
import { api } from "../../services/api";
import { socket } from "../../services/chat";
import { useHistory } from "react-router-dom";
import "./index.css"

export function Moderador() {

    const history = useHistory();
    const paramBusca = new URLSearchParams(window.location.search);
    const empId = paramBusca.get("userId")
    const goMostrarSenha = () => history.push(`/MostrarSenha/?empId=${empId}`);
    const [senha, setSenha] = useState("")

    const [empresaName, setEmpresas] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const paramsBusca = new URLSearchParams(window.location.search);

        const empresaId = paramsBusca.get("userId")

        async function getEmpresa() {
            try {
                const empresas = (await api.get(`/empresas/${empresaId}`)).data;

                setEmpresas(empresas.nome);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        }

        socket.connect();

        socket.emit("join queue", empresaId);

        getEmpresa();

        socket.emit("create queue", empresaId)

        return () => {
            socket.disconnect();
        };
    }, []);

    async function getSenha() {

        const paramsBusca = new URLSearchParams(window.location.search);

        const empresaId = paramsBusca.get("userId")

        try {

            const numTicket = +senha + 1

            const ticket = (await api.get(`/empresas/funcionario/${empresaId}/${numTicket}`)).data

            if (ticket === null) {
                return alert("Não ha mais usuarios para chamar!")
            }

            setSenha(numTicket)

            socket.emit("next ticket", ticket, empresaId);
        } catch (err) {

            console.log(err);

        }

    }

    return (
        <>
            {
                loading ?
                    <p>carregando...</p> :
                    <>
                        <DashboardContainer />
                        <div>
                            <div className="user-container">
                                <h1 className="senhaatual">Senha atual:</h1>
                                <div className="card" >
                                    <div className="content_card">
                                        <div>
                                            <p className="imgpato"></p>
                                        </div>
                        
                                        <div>
                                            <h2 className="senha">{senha}</h2>
                                        </div>
                                    </div>
                                </div>

                                <p >{empresaName}</p>
                            </div>


                            <button className="btn" onClick={getSenha}>Proxima</button>
                            <br />  <br />
                            <button className="btn" onClick={goMostrarSenha}>Tela Mostrar Senha</button>
                        </div>
                    </>
            }
        </>
    );
}