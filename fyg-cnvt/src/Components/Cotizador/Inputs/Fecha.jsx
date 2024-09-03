function Fecha () {
    return (
        <div className="col-md-3">
            <label htmlFor="inputFecha" className="form-label">Fecha</label>
            <input type="date" className="form-control" id="inputFecha" name="inputFecha" required/>
            <div className="invalid-feedback">
            Pon la fecha del evento, o una aproximada!
            </div>
        </div>
    )
}

export default Fecha