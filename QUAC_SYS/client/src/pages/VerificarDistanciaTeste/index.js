/*global google*/
import React, { Component } from "react";
import { withScriptjs } from "react-google-maps";
import Map from '../../components/Mapa';
import { useHistory } from "react-router-dom";
import { ReturnDeshboard } from "../../components/ReturnButton";

export function RouteMap () {

    const MapLoader = withScriptjs(Map);

    const history = useHistory();
    const retirarSenha = () => history.push('./RetirarTicket');
        return (
            <>
            <ReturnDeshboard/>
                <div>
                    <MapLoader
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1NvDncK1bxyaAVTEt69j-C9csOm1ETOg"
                        loadingElement={<div style={{ height: `100%` }} />}
                    />

                    <button onClick={retirarSenha}>retirar senha</button>
                </div>
            </>
            
        );
}

