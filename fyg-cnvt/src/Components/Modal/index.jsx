import Cotizador from "../Cotizador"
import { CotizadorProvider } from "../Cotizador/Context"

function Modal () {
    return (
        <div className="modal" id="registroModal" tabIndex="-1" aria-labelledby="registroModal" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Registro Cotizador</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <CotizadorProvider>
                        <Cotizador />
                    </CotizadorProvider>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" form="crearRegistro">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal