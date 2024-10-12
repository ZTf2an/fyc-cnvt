import { useContext } from "react";
import { RegistroContext } from "../../Context";
import Cotizador from "../Cotizador";

function EditModal ({regTarget}) {
    const {editRow} = useContext(RegistroContext);
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Editor de Registro</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Cotizador object={regTarget} formName={"editarRegistro"} edit={editRow}/>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn btn-primary" form="editarRegistro">Guardar Cambios</button> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default EditModal;