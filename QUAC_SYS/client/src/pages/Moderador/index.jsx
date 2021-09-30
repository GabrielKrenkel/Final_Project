import { DashboardContainer } from "../../components/DashboardContaimer"
import { api } from "../../services/api";

export function Moderador() {

    let senha = 1

    async function getSenha(empresaId) {
        
        const senhaCall = senha++
        
        console.log(senhaCall);
    }

    return (
        <>
        <DashboardContainer/>

            <div className="user-container">
                <h1>Senha atual:</h1>
                <h2>(x)</h2>
                <p>Senha anterior: (x)</p>
                <p>(aqui vai o nome do estabelecimento)</p>
            </div>


            <button onClick={getSenha}>Proxima</button>
        </>
    );
}