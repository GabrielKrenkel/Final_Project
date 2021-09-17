import { DevDashboard } from "../../components/DevDashboard";
import { UserDashboard } from "../../components/usuarios";
import { NotFound } from "../NotFound";

export function Dashboard({ userRole }) {  

  if (userRole === "dev") {
    return <DevDashboard />
  }if (userRole === "user") {
    return <UserDashboard />
  }

  return <NotFound />
} 