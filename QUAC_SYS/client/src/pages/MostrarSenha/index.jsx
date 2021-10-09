import React, { useState, useEffect } from "react";
import { socket } from "../../services/chat";

export function MostrarSenha() {
    
    const [currentTicket, setCurrentTicket] = useState(undefined);
    
    useEffect(() => {
        
        const paramBusca = new URLSearchParams(window.location.search);

        const empresaId = paramBusca.get("empId")

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
    
    
    return(
        <>

        <br /><br /><br />
        
        {
            !currentTicket ?
            <p>Carregando...</p> :
            <p>Senha do atual: {currentTicket}</p>

        }
        
        </>
    )
}