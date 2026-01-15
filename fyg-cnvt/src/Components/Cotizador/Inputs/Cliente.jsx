function Cliente ({value}) {
    return (<>
        <div className="col-md-9 mb-1">
            <label htmlFor="inputNombreConjunto" className="form-label">CONJUNTO*</label>
            <input type="text" className="form-control fs-5" id="inputNombreConjunto" name="inputNombreCliente" placeholder="Nombre del Conjunto, Cliente o Asociación que irá en el titulo de la cotización" required/>
            <div className="invalid-feedback">
            Escribe el nombre del Conjunto!
            </div>
        </div>

        <div className="col-md-3 mb-1">
            <label htmlFor="inputNit" className="form-label">NIT.</label>
            <input type="text" className="form-control fs-5" id="inputNit" name="inputNit" placeholder="NIT-copropiedad"/>
        </div>
        
        <div className="col-md-12 mb-1">
            <label htmlFor="inputNit" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="inputDir" name="inputDireccion" placeholder="Dirección donde se realizará la asamblea"/>
        </div>

        <div className="col-md-6 mb-1">
            <label htmlFor="inputNombreCliente" className="form-label">CLIENTE</label>
            <input type="text" className="form-control" id="inputNombreCliente" name="inputTitular" placeholder="Nombre del Administrador o Representante del evento."/>
            <div className="invalid-feedback">
                Escribe el nombre del cliente!
            </div>
        </div>
        <div className="col-md-6 mb-1">
            <label htmlFor="inputCorreo" className="form-label">Correo Electronico del Cleinte</label>
            <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">@</span>
                <input type="email" className="form-control" id="inputCorreo" name="inputCorreo" placeholder="cliente@ejemplo.com,correo@..." required/>
                <div className="invalid-feedback">
                Escribir correo del cliente.
                </div>
            </div>
        </div>
    </>)
}

export default Cliente