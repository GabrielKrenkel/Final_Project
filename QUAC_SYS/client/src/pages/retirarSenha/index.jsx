import React, { useState } from "react";
import { ReturnDeshboard } from "../../components/ReturnButton";
import { api } from "../../services/api";
import { socket } from "../../services/chat";

export function RetirarTicket () {
    const [senha, setSenha] = useState("");
    const [currentTicket, setCurrentTicket] = useState(0);

    useEffect(() => {
        const empresaId = sessionStorage.getItem("empresaName")

        socket.connect();
        socket.emit("join queue", empresaId);        
        socket.on("next ticket", ticket => {
            console.log("Novo ticket: " + ticket);
            setCurrentTicket(ticket.ticket);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    async function retiraSenha() {    
        
        const userId = localStorage.getItem("user-id")

        const empresaId = sessionStorage.getItem("empresaName")
        
        try {
            
            const { ticket } = (await api.post(`/users/${empresaId}`, { userId })).data;

            setSenha(ticket);

        } catch (err) {

            console.log(err);

        }
        setLoading(false)
    }

    return (
        <>
        <ReturnDeshboard/>
        <br/>
        <a href="http://localhost:3000/" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
        <br /><br />
        <button className="btn" onClick={() => retiraSenha()}>Retirar Senha</button>

        <div className="senhaUser">
            <br />
            {senha}
            <p>{currentTicket}</p>
        </div>
        </>
    );
}