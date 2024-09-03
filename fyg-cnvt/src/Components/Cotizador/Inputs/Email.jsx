function Email () {
    return (
        <div className="col-md-6">
            <label htmlFor="inputCorreo" className="form-label">Correo Electronico del Cleinte</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" className="form-control" id="inputCorreo" name="inputCorreo" placeholder="cliente@ejemplo.com,correo@..." required/>
                    <div className="invalid-feedback">
                    Escribir correo del cliente.
                    </div>
                </div>
        </div>
    )
}

export default Email