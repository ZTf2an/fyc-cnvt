function ActaSetting ( ){
    return (
        <div className="col-md-4 border-end">
            <div className="input-group">
                <input className="form-control" type="text" value="Acta" disabled/>
                <span className="input-group-text">
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerActa" 
                        // onclick="tacharTexto(this)"
                        checked
                        onChange={e=> console.log(e)}
                    />
                </span>
            </div>
        </div>
    )
}

export default ActaSetting