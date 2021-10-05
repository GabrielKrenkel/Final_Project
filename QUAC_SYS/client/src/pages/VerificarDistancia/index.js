import React, { useEffect, useState } from "react";
import { withScriptjs } from "react-google-maps";
import Map from '../../components/Mapa';
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import "./styles.css"

export function RouteMap() {

    const MapLoader = withScriptjs(Map);

    const history = useHistory();

    const retirarSenha = () => history.push('./RetirarTicket');

    function clear() {

        sessionStorage.removeItem("empresaName")

        window.location.replace("/dashboard");
    }


    const [empresa, setEmpresas] = useState([]);

    useEffect(() => {

        async function getEmpresa() {

            let name = sessionStorage.getItem("empresaName")

            try {

                const empresa = (await api.get(`/empresas/${name}`)).data;

                console.log(empresa);

                setEmpresas(empresa);

                localStorage.setItem("latEMP", empresa.latitude)
                localStorage.setItem("lonEMP", empresa.longitude)

            } catch (err) {

                console.log(err);

            }
           

        }

        getEmpresa();
        
    }, []);

    return (
        <>
            <button className="btnhome" onClick={() => clear()}>Home</button>
            <div>
                <MapLoader
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1NvDncK1bxyaAVTEt69j-C9csOm1ETOg"
                    loadingElement={<div style={{ height: `100%` }} />}
                />

                <button className="btnSenha" onClick={retirarSenha}>retirar senha</button>
            </div>
        </>

    );
}

