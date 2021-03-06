/*global google*/
import React, { Component } from "react";
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import "./styles.css"

export class Map extends Component {

    constructor(props) {
        super(props)

        this.state = {
            directions: null,
            destination: { lat: +props.lat, lng: +props.lon },
            distance: 0,
            time: 0
        };
    }

    


    componentDidMount() {

        let paramsBusca = new URLSearchParams(window.location.search);

        const lat = paramsBusca.get("lat");

        const lng = paramsBusca.get("lon");

        // Obter a destination do banco de dados        
        const directionsService = new google.maps.DirectionsService();
        const origin = { lat: +lat, lng: +lng };
        directionsService.route(
            {
                origin: origin,
                destination: this.state.destination,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRICAL
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        distance: result.routes[0].legs[0].distance.text,
                        time: result.routes[0].legs[0].duration.text
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }


    calcRoute(origin, destination, directionsDisplay, directionsService) {
        let request = {
            origin: origin,
            destination: destination
        }

        directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                const output = document.querySelector('#output');
                output.innerHTML = "Estabelecimento: " + destination + ".<br /> Distância dirigindo <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Tempo estimado <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
                directionsDisplay.setDirections(result);
            } else {
                directionsDisplay.setDirections({ routes: [] });
                directionsDisplay.setCenter(origin);
                // output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não conseguimos calcular a distância da rota.</div>";
            }
        });
    }


    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: -26.830153, lng: -49.299769 }}
                defaultZoom={13}
            >
                <DirectionsRenderer
                    directions={this.state.directions}
                />
            </GoogleMap>
        ));

        return (
            <>
                <a className="logo-quac-a" href="https://quac-system-front.herokuapp.com"  target="_parent"><p className="logo-titulo-quac">QUAC SYSTEM</p></a>
                <div className="container">
                    <GoogleMapExample
                        containerElement={<div className="maps" />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    <div className="distance-info">
                    <p className="p_distancia"><i class="distance-icon uil uil-streering"></i> {this.state.distance}</p>
                    <p className="p_tempo"><i class="distance-icon uil uil-hourglass"></i>{this.state.time} para chegar ao seu destino</p>
                    </div>
                </div>
            </>
        );
    }
}

export default Map;