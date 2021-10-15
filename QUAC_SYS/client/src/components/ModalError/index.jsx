import "./index.css"

export function ModalError({ children, onClose }) {   

    
    
    return (
        <section className="modal">
            <section className="modal-content">
               
                { children }
            </section>
        </section>
    );
}

