import { Redirect } from "react-router-dom";
import authServices from "../../services/authServices";
import { LoginAndRegister } from "../../components/TelaLogin";

export function Home() {
  const accessToken = authServices.getAccessToken();  

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (
<<<<<<< HEAD
    <>
      <LoginAndRegister/>
    </>
=======
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

>>>>>>> estilizacao2
  );  
}
