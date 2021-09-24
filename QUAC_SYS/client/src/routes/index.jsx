import { 
    BrowserRouter as Router, 
    Route, 
    Switch    
} from "react-router-dom";
import { UsuarioCadastrar } from "../pages/CadastrarUser";
import { EmpresaCadastrar } from "../pages/CadastrarEmpresas";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "./privateRoutes";
import { RouteMap } from "../pages/VerificarDistanciaTeste"
import { RetirarTicket } from "../pages/retirarSenha";


export function Routes() {
    return (
        <>            
            <Router>                 
                <Switch>  
                    <Route exact path="/" component={Home} />  
                    <Route path="/cadastrar" component={UsuarioCadastrar} /> 

                    <PrivateRoute path="/CadastrarEmpresas" permissions={["dev", "moderador", "user"]}>
                        <EmpresaCadastrar />
                    </PrivateRoute>  

                    <PrivateRoute path="/VerificaDistancia" permissions={["dev", "moderador", "user"]}>
                        <RouteMap/>
                    </PrivateRoute>       

                    <PrivateRoute path="/RetirarTicket" permissions={["dev", "moderador", "user"]}>
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