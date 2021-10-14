import "./index.css"

export function ModalError({ children, onClose }) {   

    setTimeout(onClose, 900)
    
    return (
        <section className="modal">
            <section className="modal-content">
               
                { children }
            </section>
        </section>
    );
}

