import { DevDashboard } from "../DevDashboard";
import { UserDashboard } from "../../components/usuarios";
import { NotFound } from "../NotFound";
import { Moderador } from "../Moderador"

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