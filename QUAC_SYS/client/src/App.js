import './App.css';
// import ExampleDirections, { VerificarDistancia } from './pages/VerificarDistância/VerificarDistancia';
import { withScriptjs } from "react-google-maps";
import Map from './components/Mapa';

function App() {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1NvDncK1bxyaAVTEt69j-C9csOm1ETOg"
      loadingElement={<div style={{ height: `100%` }} />}
  />
  );
}

export default App;
