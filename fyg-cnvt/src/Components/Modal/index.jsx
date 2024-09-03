import Cotizador from "../Cotizador"

function Modal () {
    return (
        <div className="modal fade" id="registroModal" >
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Registro Cotizador</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Cotizador />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal