import { 
    BrowserRouter as Router, 
    Route, 
    Switch    
} from "react-router-dom";
import { UsuarioCadastrar } from "../pages/cadastrar";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "./privateRoutes";


export function Routes() {
    return (
        <>            
            <Router>                 
                <Switch>  
                    <Route exact path="/" component={Home} />  
                    <Route path="/cadastrar" component={UsuarioCadastrar} />                                                                                                                                    
                    <PrivateRoute path="/dashboard" permissions={["dev", "moderador", "user"]}>
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="*" component={NotFound} />                                            
                </Switch>          
            </Router>
        </>
    );
}