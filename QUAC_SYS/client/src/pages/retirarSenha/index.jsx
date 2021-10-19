import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { socket } from "../../services/chat";
import { Footer } from "../../components/Footer";

import "./styles.css"

export function RetirarTicket() {

    const paramBusca = new URLSearchParams(window.location.search);

    const history = useHistory()
    const [senha, setSenha] = useState(0);
    const [currentTicket, setCurrentTicket] = useState(0);

    const userId = paramBusca.get("userId")


    useEffect(() => {

        const paramsBusca = new URLSearchParams(window.location.search);

        const empresaId = paramsBusca.get("empId")

        const userId = paramsBusca.get("userId")

        socket.connect();

        socket.emit("join queue", empresaId);

        socket.on("current ticket", lastTicket => {

            setCurrentTicket(lastTicket.currentTicket)

            findLastTicket(userId)
        })

        socket.on("next ticket", ticket => {

            setCurrentTicket(ticket.ticket);

            findLastTicket(userId)
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    async function findLastTicket(idUser) {

        try {
            const { ticket } = (await api.get(`/ticket/local/${idUser}`)).data

            setSenha(ticket)
        } catch (err) {
            console.log(err);
        }
    }

    async function retiraSenha() {

        const empresaId = paramBusca.get("empId");

        const userId = paramBusca.get("userId")

        try {

            const { ticket } = (await api.post(`/ticket/${empresaId}`, { userId })).data;

            setSenha(ticket);

        } catch (err) {

            console.log(err);

        }
    }

    return (
        <>
            <button className="btnhome" onClick={() => history.push(`/dashboard/?userId=${userId}`)}>Home</button>
            <br />
            <a className="logo-quac-a" href="https://quac-system-front.herokuapp.com"  target="_parent"><p className="logo-titulo-quac">QUAC SYSTEM</p></a>
            <br /><br />
            <button className="btn" onClick={() => retiraSenha()}>Retirar Senha</button>

            <div className="senhaUser">
                <br />
                <p className="senha-atual">Senha atual: {currentTicket}</p>
                <br />
                
                <h5 className="senha">Sua senha:
                    <>
                        {
                            senha <= currentTicket ?
                            <h4 className="senha-num">0</h4> :
                            <h4 className="senha-num">{senha}</h4>
                        }
                    </>    
                </h5>
            </div>
            <br /><br />
            <footer className="footer-senha">
                <Footer/>
            </footer>
        </>
    );
}