
export function DashboardContainer({title, children}) {
	function handleSignOut() {
		localStorage.clear();
		window.location.replace("/");
	}

    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>{title}</h1>
          <button onClick={handleSignOut}>Sair</button>       
        </header>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    )
}