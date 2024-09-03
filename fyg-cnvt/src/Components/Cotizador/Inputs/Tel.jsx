import { BsTelephoneFill } from "react-icons/bs";

function Tel () {
    return (
        <div className="col-md-3">
                <label htmlFor="inputTelefono" className="form-label">Numero Telefónico</label>
                <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend"><BsTelephoneFill /></span>
                <input type="number" className="form-control" id="inputTelefono" name="inputNumeroTelefonico" placeholder="300123456" minLength="3" maxLength="10"/>
                <div className="invalid-feedback">
                    Escribir numero telefonico del cliente.
                </div>
                </div>
            </div>
    )
}

export default Tel