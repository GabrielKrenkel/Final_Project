import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { socket } from "../../services/chat";
import "./styles.css"

export function MostrarSenha() {
    
    const [currentTicket, setCurrentTicket] = useState(0);
    const [user, setUser] = useState(undefined)

    
    useEffect(() => {
        
        const paramBusca = new URLSearchParams(window.location.search);

        const empresaId = paramBusca.get("empId")

        socket.connect();

        socket.emit("join queue", empresaId);

        socket.on("current ticket", lastTicket => {

            console.log(lastTicket);

            setCurrentTicket(lastTicket.currentTicket)

            const user = lastTicket.userId
            
            findUser(user)
        })

        socket.on("next ticket", ticket => {

            console.log("Novo ticket: " + ticket);

            setCurrentTicket(ticket.ticket);

            findUser(ticket.user_id)
        });

        return () => {
            socket.disconnect();
        }

    }, []);
    
    async function findUser(userId) {
        
        try {
            
            const users = await api.get(`/users/${userId}`)
            
            setUser(users.data.name)

        } catch (err) {
            console.log(err);
        }
    }
    return(
        <>

        <br /><br /><br />
        <a className="logo-quac-a" href="http://localhost:3000/"  target="_parent"><p className="logo-titulo-quac">QUAC SYSTEM</p></a>
        {
            !currentTicket ?
            <p className="carregando">Carregando...</p> :
            <p className="carregando">Senha atual: <br/><span className="senha-span">{currentTicket}</span></p>

        }

        {
            !user ?
            <p></p>:
            <p className="nome-usuario">{user}</p>
        }
        
        </>
    )
}