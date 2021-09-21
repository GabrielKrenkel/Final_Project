export function TelaFuncionario(props) {
    return (
        <>
            <div>
        <div>
            <h2>Cadastro de novo usuário</h2>
        </div>
    </div>
    <div>
        <form>
            <div>
                <label for="nomes">Nome:</label>
                <input type="text">
                <br>
                <label for="nomes">E-mail:</label>
                <input type="text">
                <br>
                <label for="nomes">Senha:</label>
                <input type="text">
            </div>
            <div>
                <label for="estado">Estado:</label>
                <input type="text">
                <br>
                <label for="estado">Cidade:</label>
                <input type="text">
                <br>
                <label for="estado">Bairro:</label>
                <input type="text">
                <br>
                <label for="data">Data de nascimento:</label>
                <input type="date">
            </div>
        </form>
        <div>
            <button>Confirmar</button>
        </div>
    </div>
        </>
    )
}