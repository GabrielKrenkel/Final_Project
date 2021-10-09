import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { socket } from "../../services/chat";
import "./styles.css"

export function RetirarTicket() {

    const paramBusca = new URLSearchParams(window.location.search);

    const history = useHistory()
    const [senha, setSenha] = useState("");
    const [currentTicket, setCurrentTicket] = useState(0);

    const userId = paramBusca.get("userId")


        useEffect(() => {

            const paramsBusca = new URLSearchParams(window.location.search);
            
            const empresaId = paramsBusca.get("empId")
            
            socket.connect();

            socket.emit("join queue", empresaId);

            socket.on("current ticket", lastTicket => {
                setCurrentTicket(lastTicket)
            })

            socket.on("next ticket", ticket => {
                console.log("Novo ticket: " + ticket);
                setCurrentTicket(ticket.ticket);
            });

            return () => {
                socket.disconnect();
            }
        }, []);

    async function retiraSenha() {

        const empresaId = paramBusca.get("empId");
        
        const userId = paramBusca.get("userId") 

        console.log(empresaId);
        try {

            const { ticket } = (await api.post(`/users/${empresaId}`, { userId })).data;

            setSenha(ticket);

        } catch (err) {

            console.log(err);

        }
    }

    return (
        <>
            <button className="btnhome"onClick={() => history.push(`/dashboard/?userId=${userId}`)}>Home</button>
            <br />
            <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
            <br /><br />
            <button className="btn" onClick={() => retiraSenha()}>Retirar Senha</button>

            <div className="senhaUser">
                <br />
                {
                  senha
                }
                <p>{currentTicket}</p>
            </div>

        </>
    );
}