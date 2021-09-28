import React from "react";
import { ReturnDeshboard } from "../../components/ReturnButton";
import { api } from "../../services/api";

export function RetirarTicket () {

    async function retiraSenha(){

        const empresaId = sessionStorage.getItem("empresaName")

        try {
            
            const senha = await api.get(`/users/${empresaId}`)

            let position = senha.data + 1

            localStorage.setItem("senha", position)

            salvarSenha(position, empresaId)
            
        } catch (err) {

            console.log(err)
        }
    }

    async function salvarSenha(ticket, empresaId) {
        
        const data = {ticket}

        try {
            
            const salvarSenha = await api.post(`/users/${empresaId}`, data)
            
            
        } catch (err) {

            console.log(err);

        }
    }
    return (
        <>
        <ReturnDeshboard/>
        <br /><br />
        <button onClick={() => {retiraSenha()}}>Retirar Senha</button>
        </>
    );
}