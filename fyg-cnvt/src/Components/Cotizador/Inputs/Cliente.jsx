function Cliente () {
    return ( 
        <div className="col-md-12">
            <label htmlFor="inputNombreCliente" className="form-label">CLIENTE</label>
            <input type="text" className="form-control fs-5" id="inputNombreCliente" name="inputNombreCliente" placeholder="Nombre del Conjunto, Cliente o Asociación que irá en el titulo de la cotización" required/>
            <div className="invalid-feedback">
            Escribe el nombre del cliente!
            </div>
        </div>
    )
}

export default Cliente