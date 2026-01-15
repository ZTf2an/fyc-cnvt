import { BsTelephoneFill } from "react-icons/bs";

function Tel ({value}) {
    return (
        <div className="col-md-6">
              <label htmlFor="inputTelefono" className="form-label">Numero Telefónico.</label>
              <input type="number" className="form-control" id="inputTelefono" name="inputNumeroTelefonico" placeholder="300123456" minLength="3" maxLength="10"/>
              <div className="invalid-feedback">
                Escribir numero telefonico del cliente.
              </div>
        </div>
    )
}

export default Tel