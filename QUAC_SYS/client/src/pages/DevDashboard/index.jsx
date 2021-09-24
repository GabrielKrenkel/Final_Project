import "./index.css"
import { useHistory } from "react-router-dom";
import { DashboardContainer } from "../../components/DashboardContaimer"



export function DevDashboard() {

    const history = useHistory();
   const goCadastrarEmpresa = () => history.push('./CadastrarEmpresas');
    
    return (
        <DashboardContainer>
            <div className="admin-container"> 
                <h1>Página de dev</h1>
                <button
                onClick={goCadastrarEmpresa}>
                    Cadastrar empresa
                </button>
                
                    
            </div>                               
               
       </DashboardContainer>
    );
}