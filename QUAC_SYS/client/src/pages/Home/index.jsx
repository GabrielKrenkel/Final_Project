import { Redirect } from "react-router-dom";
import authServices from "../../services/authServices";
import { LoginAndRegister } from "../../components/TelaLogin";

export function Home() {
  const accessToken = authServices.getAccessToken();  

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (

    <>
      <LoginAndRegister/>
    </>
  );  
}
