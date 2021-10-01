import { Redirect } from "react-router-dom";
import { Login } from "../../components/Login";
import authServices from "../../services/authServices";
import { useHistory } from "react-router-dom";
import { LoginAndRegister } from "../../components/TelaLogin";

export function Home() {
  const accessToken = authServices.getAccessToken();  

  const history = useHistory();
  const goCadastrar = () => history.push('/cadastrar');

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (
    <>
      <LoginAndRegister/>
    </>
  );  
}
