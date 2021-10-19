import React from "react";
import { Footer } from "../../components/Footer";
import "./index.css"
export function InitialPage() {



    return (
        <>
            <body className="color">

                <header className="head">
                    
                        <a href="./" className="logo" target="_parent"><p className="logo-titulo">QUAC SYSTEM</p></a>
                    
                    <nav className="navgation">
                        <a className="btn btn-dark" href="./">Contact-us</a>
                        <a className="btn btn-dark" href="./">About us</a>
                        <a className="btn btn-dark" href="/login">Log-in</a>
                    </nav>
                </header>

                <main className="w-100 main">
                                   
                    <section className="container-sm sec">
                        <h3 style={{color: "white"}}>QUAC-SYS</h3>
                        <p className="info">
                            Projetado pensando na satisfação dos usuários e na diminuição de filas em hospitais, instituições privadas, 
                            entre outros devido a pandemia de Covid -19, o QUAC-SYSTEM veio para melhorar e inovar as filas de atendimentos, gerando mais conforto e segurança para seus usuários,
                            e preservando a natureza, diminuindo o gasto com papel impresso.
                        </p>
                    </section>
                    <section className="container-sm div" style={{color: "white"}}>
                        <h3>Como utilizar?</h3>
                        <p className="steps1"> 
                            <label className="steps"><strong>Passo 1</strong> Crie sua conta no nosso site.</label> <br />
                            
                            <label className="steps"><strong>Passo 2</strong> Após criar uma conta, você tera uma tela onde vai poder pesquisar a empresa de sua preferencia!</label> <br />
                            
                            <label className="steps"> <strong>Passo 3</strong> Após selecionar a empresa de sua preferencia, você terá acesso a uma tela onde você poderá verificar a distancia da sua localização até onde você deseja ir e quanto temo irá demorar até lá, se estiver tudo de acordo pressione "Próximo".</label>
                            <br />
                            <label className="steps"><strong>Passo 4</strong> Ótimo! você agora está no ultimo passo, pode retirar sua senha e ir com calma até o local! </label>
                        </p>
                    </section>
                    
                </main>

                <footer className="footer-initial">
                    <Footer/>
                </footer>

            </body>

        </>
    )
}