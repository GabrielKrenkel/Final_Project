import "./index.css"

export function DashboardContainer({title, children}) {
	function handleSignOut() {
		localStorage.clear();
    sessionStorage.clear();
		window.location.replace("/");
	}

    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>{title}</h1>
          <button className="btn-voltar" onClick={handleSignOut}>Sair</button>       
        </header>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    )
}