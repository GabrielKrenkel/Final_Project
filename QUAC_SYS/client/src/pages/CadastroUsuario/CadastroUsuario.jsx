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
                        <input className="imputname" type="text" />
                        <br />
                        <label for="nomes">E-mail:</label>
                        <input className="imputemail" type="text" />
                        <br />
                        <label for="nomes">Senha:</label>
                        <input className="imputsenha" type="text" />
                        <div>
                            <label for="estado">Estado:</label>
                            <input className="imputestado" type="text" />
                            <br />
                            <label for="estado">Cidade:</label>
                            <input className="imputcidade" type="text" />
                            <br />
                            <label for="estado">Bairro:</label>
                            <input className="imputbairro" type="text" />
                            <br />
                            <label for="data">Data de nascimento:</label>
                            <input className="imputnascimento" type="date" />
                        </div>

                        <button className="confirm">Confirmar</button>
                    </div>                        
                </form>
            </div>
        </>
    )
}