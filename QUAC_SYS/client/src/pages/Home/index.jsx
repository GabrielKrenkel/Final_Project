import { Redirect } from "react-router-dom";
import { Login } from "../../components/Login";
import authServices from "../../services/authServices";
import { useHistory } from "react-router-dom";

export function Home() {
  const accessToken = authServices.getAccessToken();  

  const history = useHistory();
  const goCadastrar = () => history.push('/cadastrar');

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="containerhome">        
<<<<<<< HEAD
        <h1 className="hometitle">trabalho final</h1>
      <Login className="login"/>  
=======
        <h1 className="hometitle">Trabalho Final</h1>
      <Login />  
>>>>>>> 61b0b42c34e893e30a23a15f93b4e27769251941
      <div>
        <button className="button"
        onClick={goCadastrar}>
          Cadastrar
        </button>  
      </div>                                 
    </div>

  );  
}
