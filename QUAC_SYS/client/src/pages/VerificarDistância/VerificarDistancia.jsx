// import { Loader } from "@googlemaps/js-api-loader";
import React from 'react'

export function VerificarDistancia() {
    window.google = window.google ? window.google : {}
    const successCallback = (position) => {
        console.log(position);
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        // console.log(latitude + ' ' + longitude);
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
    }
    const errorCallback = (error) => {
        console.error(error);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    
    let latLng = { 
        lat: +localStorage.getItem("latitude"),
        lng: +localStorage.getItem("longitude")
     };
    
    console.log(latLng)
    let mapOptions = {
        center: latLng,
        zoom: 4,
        // mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };
    let map = new window.google.maps.Map(document.getElementById('googleMap'), mapOptions);
    let directionsService = new window.google.maps.DirectionsService();
    let directionsDisplay = new window.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    
    function calcRoute() {
        let request = {
            origin: latLng,
            destination: document.getElementById("to").value,
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRICAL
        }
        directionsService.route(request, function (result, status) {
            if (status === window.google.maps.DirectionsStatus.OK) {
                // const output = document.querySelector('#output');
                // output.innerHTML = "Estabelecimento: " + document.getElementById("to").value + ".<br /> Distância dirigindo <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Tempo estimado <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
                directionsDisplay.setDirections(result);
            } else {
                directionsDisplay.setDirections({ routes: [] });
                map.setCenter(latLng);
                // output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não conseguimos calcular a distância da rota.</div>";
            }
        });
    }


    
    // let options = {
    //     types: ['(cities)']
    // }

    let input = document.getElementById("to");
    // let autocomplete = new window.google.maps.places.Autocomplete(input, options)
    calcRoute()
    // const loader = new Loader({
    //     apiKey: "AIzaSyA1NvDncK1bxyaAVTEt69j-C9csOm1ETOg",
    //     version: "weekly",
    //     libraries: ["places"]
    //   });
      
    //   const mapOptions = {
    //     center: {
    //         lat: +localStorage.getItem("latitude"),
    //         lng: +localStorage.getItem("longitude")
    //     },
    //     zoom: 4
    //   };

    //   loader
    //     .load()
    //     .then((google) => {
    //         new google.maps.Map(document.querySelector(".map") , mapOptions);
    //     })
    //     .catch(e => {
    //         // do something
    //     });
        
    // const loader = new Loader({
    //     apiKey: "AIzaSyA1NvDncK1bxyaAVTEt69j-C9csOm1ETOg",
    //     version: "weekly",
    //     ...additionalOptions,
    //   });

    // let latLng = { 
    //     lat: +localStorage.getItem("latitude"),
    //     lng: +localStorage.getItem("longitude")
    // };

    // loader.load().then(() => {
    //     map = new google.maps.Map(mapRef.current, {
    //     center: latLng,
    //     zoom: 4,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //     });
    //   });
    
    // let mapOptions = {
    //     center: latLng,
    //     zoom: 4,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // let map = new google.maps.Map(mapRef, mapOptions);
    // let directionsService = new google.maps.DirectionsService();
    // let directionsDisplay = new google.maps.DirectionsRenderer();
    // directionsDisplay.setMap(map);
    
    // function calcRoute() {
    //     let request = {
    //         origin: latLng,
    //         destination: document.getElementById("to").value,
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.METRICAL
    //     }
    //     directionsService.route(request, function (result, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             const output = document.querySelector('#output');
    //             output.innerHTML = "Estabelecimento: " + document.getElementById("to").value + ".<br /> Distância dirigindo <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Tempo estimado <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
    //             directionsDisplay.setDirections(result);
    //         } else {
    //             directionsDisplay.setDirections({ routes: [] });
    //             map.setCenter(latLng);
    //             output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não conseguimos calcular a distância da rota.</div>";
    //         }
    //     });
    // }
    
    // let options = {
    //     types: ['(cities)']
    // }


    return (
        <>
            <div className="googleMap"></div>
            <h2>Distância do seu local para o estabelecimento</h2>
            <p>A distância é de (x)km e o tempo de espera é de (x) minutos.</p>
            <form action="pesquisaLocal.html">
                <button onclick="history.back()">Voltar</button>
            </form>
            <form action="retirarSenha.html">
                <input type="submit"/>
            </form>
        </>
    );
}