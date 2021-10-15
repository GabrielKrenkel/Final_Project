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
                        <h3 style={{color: "white"}}>lorem</h3>
                        <p className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum minima, dicta expedita soluta autem cum impedit temporibus veniam nam quidem at fuga, perspiciatis hic nobis quae debitis suscipit laudantium labore.</p>
                    </section>
                    <section className="container-sm div" style={{color: "white"}}>
                        <h3>Como utilizar?</h3>
                        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam placeat quaerat ratione quia deserunt veritatis nihil voluptatem facilis dolor harum dolorum eligendi sint aspernatur, beatae, voluptatibus exercitationem, itaque pariatur doloremque!
                        </p>
                    </section>
                    
                </main>

                <footer>
                    <Footer/>
                </footer>

            </body>

        </>
    )
}