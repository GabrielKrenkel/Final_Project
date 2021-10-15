import { Redirect } from "react-router-dom";
import authServices from "../../services/authServices";

import { InitialPage } from "../InitialPage";

export function Home() {
  const accessToken = authServices.getAccessToken();  

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (

    <>
      <InitialPage></InitialPage>
    </>
  );  
}
