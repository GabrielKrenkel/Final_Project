import { useState, useEffect } from "react";
import { DashboardContainer } from "../../components/DashboardContaimer"

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

        getEmpresa();
    }, []);

    async function getSenha() {

        const empresaId = localStorage.getItem('user-id')
        
        try {

            const numTicket = +senha + 1
            
            const ticket = await api.get(`/empresas/funcionario/${empresaId}/${numTicket}`)
            
            if (ticket.data === null) {
                return alert("Não ha mais usuarios para chamar!")
            }

            console.log(ticket);
            
            setSenha(numTicket)
            
            setUltimaSenha(numTicket - 1)
            
            setUsers(ticket.data)

            console.log(users);

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