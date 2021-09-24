/*global google*/
import React, { Component } from "react";
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

class Map extends Component {
    state = {
        directions: null,
        destination: { lat: -26.883233, lng: -49.246709 },
        distance: 0,
        time: 0
    };

    componentDidMount() {
        // Obter a destination do banco de dados        
        const directionsService = new google.maps.DirectionsService();
        const origin = { lat: +localStorage.getItem("latitude"), lng: +localStorage.getItem("longitude") };               
        directionsService.route(
            {
                origin: origin,
                destination: this.state.destination,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRICAL
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result);
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
            <div>
                <GoogleMapExample
                    containerElement={<div style={{ height: `500px`, width: "500px" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <p>Distância dirigindo: {this.state.distance}</p>
                <p>Tempo: {this.state.time}</p>                                
            </div>
        );
    }
}

export default Map;