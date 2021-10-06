import { useState, useEffect } from "react";
import { DashboardContainer } from "../../components/DashboardContaimer"
import { api } from "../../services/api";
import { socket } from "../../services/chat";

export function Moderador() {

    const [senha, setSenha]= useState("")
    const [ultimaSenha, setUltimaSenha] = useState("")
    const [users, setUsers] = useState([])
    const [empresaName, setEmpresas] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const empresaId = localStorage.getItem('user-id')

        async function getEmpresa() {
            try {
                const empresas = (await api.get(`/empresas/${empresaId}`)).data;

                setEmpresas(empresas.nome);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        }

        socket.connect();
        socket.emit("join queue", empresaId);

        getEmpresa();

        return () => {
            socket.disconnect();
        };
    }, []);

    async function getSenha() {

        const empresaId = localStorage.getItem('user-id')
        
        try {

            const numTicket = +senha + 1
            
            const ticket = (await api.get(`/empresas/funcionario/${empresaId}/${numTicket}`)).data
            
            if (ticket === null) {
                return alert("Não ha mais usuarios para chamar!")
            }
                    
            setSenha(numTicket)            
            socket.emit("next ticket", ticket, empresaId);        
        } catch (err) {

            console.log(err);

        }

    }

    return (
        <>
            {
                loading ?
                <p>carregando...</p> :
                <>
                    <DashboardContainer/>
                    <div>
                        <div className="user-container">
                            <h1>Senha atual:</h1>
                            <h2>{senha}</h2>
                            
                            <p>{empresaName}</p>
                        </div>


                        <button onClick={getSenha}>Proxima</button>
                    </div>
                </>
            }
        </>
    );
}