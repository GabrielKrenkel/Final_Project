import { DashboardContainer } from "../../components/DashboardContaimer"

export function Moderador() {
    return (
        <DashboardContainer>
            <div className="user-container">
                <h1>Senha atual:</h1>
                <h2>(x)</h2>
                <p>Próxima senha: (x)</p>
                <p>Senha anterior: (x)</p>
                <p>(aqui vai o nome do estabelecimento)</p>
            </div>

        </DashboardContainer>
    );
}