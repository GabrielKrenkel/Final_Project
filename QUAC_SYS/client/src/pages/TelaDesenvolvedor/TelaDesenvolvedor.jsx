export function TelaDesenvolvedor(props) {
    return (
        <>
            <div>
        <div>
            <h2>Tela de registro</h2>
        </div>
    </div>
    <div>
        <form>
            <div>
                <label for="nomes">Nome do estabelecimento:</label>
                <input type="text">
                <br>
                <label for="nomes">Tipo de estabelecimento:</label>
                <input type="text" placeholder="Ex: Hospital" required>
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
                <label for="estado">Rua:</label>
                <input type="text">
                <br>
            </div>
            <div>
                <label for="nomes">Longitude:</label>
                <input type="text">
                <br>
                <label for="nomes">Latitude:</label>
                <input type="text">
            </div>
        </form>
        <div>
            <button>Confirmar</button>
        </div>
    </div>
        </>
    )
}