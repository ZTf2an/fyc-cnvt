import { BsPencilSquare } from "react-icons/bs";

function SonidoSetting () {
    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className="form-control" value="Sonido" disabled/>
                <span className="input-group-text">
                    <BsPencilSquare
                        className="me-1"
                        role="button" 
                        // onclick="esconderOMostrarContenedor(this)"
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerSonido" 
                        // onclick="esconderOMostrarBotonEditar(this)" 
                        onChange={e=>e}
                        checked
                    />
                </span>                        
            </div>
            <div name="contenedor-sonido" className="esconder-mostrar-contenedor" hidden>
            <div className="row mb-1">
                <div className="input-group">
                    <span className="input-group-text">
                        Cabinas
                    </span>
                    <input className="form-control" type="number" value="2" name="inputSerCabinas" onChange={e=>e}/>
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
                        type="button">
                        <i className="bi bi-plus-circle-fill"></i>
                    </button>
                </div>                          
            </div>
            <div className="row mb-1">
                <div className="input-group">
                    <span className="input-group-text">
                        Microfonos
                    </span>
                    <input className="form-control" type="number" value="4" onChange={e=>e} name="inputSerMicrofonos"/>
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
            <div className="row mb-1">
                <div className="input-group">
                    <span className="input-group-text">
                        Patinadores
                    </span>
                    <input className="form-control" type="number" value="2" onChange={e=>e} name="inputSerPatinadores1"/>
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

export default SonidoSetting