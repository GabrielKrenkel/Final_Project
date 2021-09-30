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
    <>
    <img src="linkDaImagem" alt="Descrição da imagem" />
    
    <div className="containerhome">        
        <h1 className="hometitle">trabalho final</h1>
      <Login className="login"/>  
      <div>
        <button className="button"
        onClick={goCadastrar}>
          Cadastrar
        </button>  
      </div>                                 
    </div>
    </>
  );  
}
