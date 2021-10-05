import { DevDashboard } from "../../pages/DevDashboard";
import { UserDashboard } from "../usuarios";
import { NotFound } from "../NotFound";
import { Moderador } from "../../pages/ModeradorDashboard"
import "./styles.css"

export function Dashboard({ userRole }) {  

  if (userRole === "dev") {
    return <DevDashboard />
  }if (userRole === "user") {
    return <UserDashboard />
  }if (userRole === "moderador") {
    return <Moderador />
  }
  return <NotFound />
} 