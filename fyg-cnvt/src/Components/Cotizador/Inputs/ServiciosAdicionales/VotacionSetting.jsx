function VotacionSetting () {
    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className="form-control" value="Votación" disabled onChange={e=>e}/>
                <span className="input-group-text">
                    <i 
                        className="bi bi-pencil-square me-2" 
                        role="button" 
                        // onclick="esconderOMostrarContenedor(this)"
                    ></i>
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        // onclick="esconderOMostrarBotonEditar(this)" 
                        onChange={e=>e} 
                        name="inputSerVotacion" 
                        checked
                    />
                </span>
            </div>
            <div name="contenedor-votacion" className="esconder-mostrar-contenedor" hidden>
                <div className="row mb-1">
                    <div className="input-group">
                        <span className="input-group-text">
                            Patinadores
                        </span>
                        <input 
                            className="form-control" 
                            type="number" 
                            value="2" 
                            onChange={e=>e} 
                            name="inputSerPatinadores2"
                        />
                        <button 
                            className="btn btn-outline-secondary restar-1" 
                            // onclick="restar1(this)" 
                            type="button"
                        >
                            <i className="bi bi-dash-circle-fill"></i>
                        </button>
                        <button 
                            className="btn btn-outline-secondary sumar-1" 
                            // onclick="sumar1(this)" 
                            type="button"
                        >
                            <i className="bi bi-plus-circle-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VotacionSetting