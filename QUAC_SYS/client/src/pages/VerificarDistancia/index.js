
import React, { useEffect, useState } from "react";
import { withScriptjs } from "react-google-maps";
import Map from '../../components/Mapa';
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import "./styles.css"


export function RouteMap() {

    let paramBusca = new URLSearchParams(window.location.search);

    const empresaId = paramBusca.get("empId");

    const userId = paramBusca.get("userId");

    const [latEmp, setLatEmp] = useState("")
    const [lonEmp, setLonEmp] = useState("")
    const MapLoader = withScriptjs(Map);
    const history = useHistory();
    const retirarSenha = () => history.push(`/RetirarTicket/?empId=${empresaId}&userId=${userId}`);
    const [, setEmpresas] = useState([]);

    useEffect(() => {

        async function getEmpresa() {

            try {
                let paramsBusca = new URLSearchParams(window.location.search);

                const EmpresaId = paramsBusca.get("empId");

                const empresa = (await api.get(`/empresas/${EmpresaId}`)).data;

                console.log(empresa);

                setEmpresas(empresa);

                setLatEmp(empresa.latitude)
                setLonEmp(empresa.longitude)

            } catch (err) {

                console.log(err);

            }


        }

        getEmpresa();

    }, []);

    return (
        <>
            <button className="btnhome" onClick={() => { history.push(`/dashboard/?userId=${userId}`); }}>Home</button>

            <div>
                <MapLoader
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1NvDncK1bxyaAVTEt69j-C9csOm1ETOg"
                    loadingElement={<div style={{ height: `100%` }} />}
                    lat={latEmp}
                    lon={lonEmp}
                />

                <button className="btnSenha" onClick={retirarSenha}>retirar senha</button>
            </div>
        </>

    );
}

