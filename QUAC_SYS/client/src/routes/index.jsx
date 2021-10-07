import { 
    BrowserRouter as Router, 
    Route, 
    Switch    
} from "react-router-dom";
import { EmpresaCadastrar } from "../pages/CadastrarEmpresas";
import { Dashboard } from "../components/Dashboard";
import { Home } from "../pages/Home";
import { NotFound } from "../components/NotFound";
import { PrivateRoute } from "./privateRoutes";
import { RouteMap } from "../pages/VerificarDistancia"
import { RetirarTicket } from "../pages/retirarSenha";
import { MostrarSenha } from "../pages/MostrarSenha";



export function Routes() {
    return (
        <>            
            <Router>                 
                <Switch>  
                    <Route exact path="/" component={Home} />  
                    

                    <PrivateRoute path="/CadastrarEmpresas" permissions={["dev"]}>
                        <EmpresaCadastrar />
                    </PrivateRoute>  

                    <PrivateRoute path="/MostrarSenha" permissions={["moderador"]}>
                        <MostrarSenha/>
                    </PrivateRoute>

                    <PrivateRoute path="/VerificaDistancia" permissions={["user"]}>
                        <RouteMap/>
                    </PrivateRoute>       

                    <PrivateRoute path="/RetirarTicket" permissions={["user"]}>
                        <RetirarTicket/>
                    </PrivateRoute>   

                    <PrivateRoute path="/dashboard" permissions={["dev", "moderador", "user"]}>
                        <Dashboard />
                    </PrivateRoute>

                    <Route path="*" component={NotFound} />                                            
                </Switch>          
            </Router>
        </>
    );
}