import { DashboardContainer } from "../DashboardContaimer";
import { useHistory } from "react-router-dom";


export function UserDashboard() {

    const history = useHistory();
    const calcRoute = () => history.push('./VerificaDistancia');

    const successCallback = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
    }
    const errorCallback = (error) => {
        console.error(error);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

    let input = document.getElementById("to");

    return (
        <DashboardContainer >
            <div className="user-container">
                <h1>Página de usuários</h1>

                <div className="form-group">
                    <h1>Escolha o estabelecimento</h1>
                    <label htmlFor="to" className="paraOndeLabel"></label>
                    <div className="col-xs-4">
                        <input type="text" id="to" placeholder="Estabelecimento" className="form-control" />
                    </div>
                </div>

                <button onClick={calcRoute}>Calcular Rota</button>
            </div>

        </DashboardContainer>
    );
}