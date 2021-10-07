import React, { useState, useEffect } from "react";
import { socket } from "../../services/chat";

export function MostrarSenha() {
    
    const [currentTicket, setCurrentTicket] = useState(0);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const empresaId = sessionStorage.getItem("empresaName")

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
        <p>Senha do usuario: {currentTicket}</p>

        
        </>
    )
}