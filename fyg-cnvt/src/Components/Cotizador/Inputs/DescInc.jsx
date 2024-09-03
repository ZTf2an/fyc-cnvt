function DescInc () {
    return ( 
        <div className="col-md-3">
            <div className="mb-3">
            <label htmlFor="input-descuento" className="form-label">Descuento</label>
            <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">
                <i className="bi bi-pencil-square" role="button" id="button-edit-DescuentoForm"></i>
                </span>
                <input type="number" className="form-control" id="input-descuento" name="inputDescuento" placeholder="Ej: 10" disabled required/>
            </div>
            </div>
            <div>
            <label htmlFor="input-incremento" className="form-label">Incremento</label>
            <div className="input-group">
                <span className="input-group-text">
                <i className="bi bi-pencil-square" role="button" id="button-edit-IncrementoForm"></i>
                </span>
                <input type="number" className="form-control" id="input-incremento" name="inputIncremento" placeholder="Ej: 10" disabled required/>
            </div>            
            </div>
        </div>

    )
}

export default DescInc