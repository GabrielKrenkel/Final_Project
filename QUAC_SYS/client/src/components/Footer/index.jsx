import "./styles.css"

export function Footer() {

return(
    <>
    
    

    <div className="footer-basic">
        <footer className="curve">
            <div className="social">
                <a href="./"><i className="footer-icon uil uil-twitter-alt"></i></a>
                <a href="./"><i className="footer-icon uil uil-github-alt"></i></a>
                <a href="./"><i className="footer-icon uil uil-linkedin"></i></a>
                <a href="./"><i className="footer-icon uil uil-instagram"></i></a>
            </div>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="./">Home</a></li>
                <li className="list-inline-item"><a href="./">Services</a></li>
                <li className="list-inline-item"><a href="./">About</a></li>
                <li className="list-inline-item"><a href="./">Terms</a></li>
                <li className="list-inline-item"><a href="./">Privacy Policy</a></li>
            </ul>
                <p className="copyright">DWAYEL-Tech © 2021</p>
        </footer>
    </div>
    </>
)
}
