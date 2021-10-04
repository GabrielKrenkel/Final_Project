import { useState } from "react";
import { DashboardContainer } from "../../components/DashboardContaimer"
import { api } from "../../services/api";

export function Moderador() {

    const [senha, setSenha]= useState("")
    const [ultimaSenha, setUltimaSenha] = useState("")
    const [users, setUsers] = useState([])

    async function getSenha() {

        const numTicket = 1

        const empresaId = localStorage.getItem('user-id')
        
        try {

            const ticket = await api.get(`/empresas/funcionario/${empresaId}/${numTicket}`)

            if (!ticket) {
                return alert("Não há usuarios para chamar!")
            }

            const user = ticket.data

            setUsers(user)

            console.log(users);

        } catch (err) {

            console.log(err);

        }

    }

    return (
        <>
        <DashboardContainer/>
            <div>
                <div className="user-container">
                    <h1>Senha atual:</h1>
                    <h2>{senha}</h2>
                    <p>Senha anterior: {ultimaSenha}</p>
                    <p>(aqui vai o nome do estabelecimento)</p>
                </div>


                <button onClick={getSenha}>Proxima</button>
            </div>
        </>
    );
}