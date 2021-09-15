export function VerificarDistancia(props) {
    return (
        <>
            <h2>Distância do seu local para o estabelecimento</h2>
            <p>A distância é de (x)km e o tempo de espera é de (x) minutos.</p>
            <form action="pesquisaLocal.html">
                <button onclick="history.back()">Voltar</button>
            </form>
            <form action="retirarSenha.html">
                <input type="submit"/>
            </form>
        </>
    );
}