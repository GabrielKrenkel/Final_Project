import React, { useState } from "react";
import { ReturnDeshboard } from "../../components/ReturnButton";
import { api } from "../../services/api";

export function RetirarTicket () {
    const [senha, setSenha] = useState("");

    async function retiraSenha() {    
        const userId = localStorage.getItem("user-id")
        const empresaId = sessionStorage.getItem("empresaName")
        
        try {
            
            const { ticket } = (await api.post(`/users/${empresaId}`, { userId })).data;

            setSenha(ticket);
            
        } catch (err) {

            console.log(err);

        }
    }

    return (
        <>
        <ReturnDeshboard/>
        <br /><br />
        <button onClick={retiraSenha}>Retirar Senha</button>

        <div className="senhaUser">
            <br />
            {senha}
        </div>
        </>
    );
}