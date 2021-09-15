export function PesquisaLocal(props) {
    return(
        <>

            <h1>Tela de pesquisa</h1>

            <form action="verificarDistancia.html">
                <label htmlFor="gsearch"></label>
                <input type="search" id="gsearch" name="gsearch"/>
                <input type="submit"/>
            </form>
        </>
    );
}