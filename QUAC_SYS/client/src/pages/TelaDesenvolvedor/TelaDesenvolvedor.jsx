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
                <input className="imputestabelecimento" type="text"/>
                <br/>
                <label for="nomes">Tipo de estabelecimento:</label>
                <input className="imputtype"type="text" placeholder="Ex: Hospital" required/>
            </div>
            <div>
                <label for="estado">Estado:</label>
                <input className="imputestado"type="text"/>
                <br/>
                <label for="estado">Cidade:</label>
                <input className="imputcidade" type="text"/>
                <br/>
                <label for="estado">Bairro:</label>
                <input className="imputbairro" type="text"/>
                <br/>
                <label for="estado">Rua:</label>
                <input className="imputrua"  type="text"/>
                <br/>
            </div>
            <div>
                <label for="nomes">Longitude:</label>
                <input className="imputlongitude" type="text"/>
                <br/>
                <label for="nomes">Latitude:</label>
                <input className="imputlatitude" type="text"/>
            </div>
        </form>
        <div>
            <button className="confirm" >Confirmar</button>
        </div>
    </div>
        </>
    )
}