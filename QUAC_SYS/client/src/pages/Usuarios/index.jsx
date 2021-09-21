export function Usuarios() {
    
    const successCallback = (position) => {
        console.log(position);
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
    <>
        <div className="form-group">
                <h1>Escolha o estabelecimento</h1>
                <label htmlFor="to" className="paraOndeLabel"></label>
            <div className="col-xs-4">
                <input type="text" id="to" placeholder="Estabelecimento" className="form-control"/>
            </div>
        </div>
    </>
    )
}