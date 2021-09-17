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
    <div className="container-home">        
        <h1 className="home-title">trabalho final</h1>
      <Login />  
      <div>
        <button
        onClick={goCadastrar}>
          Cadastrar
        </button>  
      </div>                                 
    </div>

  );  
}
