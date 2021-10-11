import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { socket } from "../../services/chat";
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

        findLastTicket(userId)

        socket.connect();

        socket.emit("join queue", empresaId);

        socket.on("current ticket", lastTicket => {
            setCurrentTicket(lastTicket.currentTicket)

        })

        socket.on("next ticket", ticket => {

            setCurrentTicket(ticket.ticket);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    async function findLastTicket(idUser) {

        try {
            const { ticket } = (await api.get(`/users/local/${idUser}`)).data

            if (ticket >= currentTicket) {
                setSenha(0)
            } else {
                setSenha(ticket)
            }
        } catch (err) {
            console.log(err);
        }
    }
    async function retiraSenha() {

        const empresaId = paramBusca.get("empId");

        const userId = paramBusca.get("userId")

        try {

            const { ticket } = (await api.post(`/users/${empresaId}`, { userId })).data;

            setSenha(ticket);

        } catch (err) {

            console.log(err);

        }
    }

    return (
        <>
            <button className="btnhome" onClick={() => history.push(`/dashboard/?userId=${userId}`)}>Home</button>
            <br />
            <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
            <br /><br />
            <button className="btn" onClick={() => retiraSenha()}>Retirar Senha</button>

            <div className="senhaUser">
                <br />

                <p>Sua senha: {senha}</p>


                <p>Senha atual: {currentTicket}</p>
            </div>

        </>
    );
}