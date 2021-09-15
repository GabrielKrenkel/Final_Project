export function TelaLogin(props) {
    return (
        <>
            <form action="action_page.php" method="post">
                <div className="container">
                    <label htmlFor="username"><b> Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" required/>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required />
                    <button type="submit">Login</button>
                </div>

                <div className="container" style="background-color:#f1f1f1">
                <button type="button" className="cancelbtn">Cancel</button>
                <button type="button" className="registerbtn">Cadastrar</button>
                <span className="psw">Esqueceu a <a href="#">senha?</a></span>
            </div>
            </form>
        </>
    );
}