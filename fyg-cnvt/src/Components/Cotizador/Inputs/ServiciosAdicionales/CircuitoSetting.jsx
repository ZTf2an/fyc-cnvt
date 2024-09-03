import { BsPencilSquare } from "react-icons/bs";

function CircuitoSetting() {
    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input 
                    className="form-control" 
                    // style="text-decoration : line-through" 
                    value="Circuito Cerrado" 
                    onChange={e=>e} 
                    disabled
                />
                <span className="input-group-text">
                    <BsPencilSquare
                    className="me-1"
                        role="button" 
                        // onclick="esconderOMostrarContenedor(this)" 
                        hidden
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        // onclick="esconderOMostrarBotonEditar(this)" 
                        name="inputSerCircuitoCerrado"
                    />
                </span>
            </div>
            <div name="contenedor-circuitoCerrado" className="esconder-mostrar-contenedor" hidden>
                <div className="row mb-1">
                    <div className="input-group">
                        <span className="input-group-text">
                            Salones
                        </span>
                        <input className="form-control" type="number" value="2" onChange={e=>e} name="inputSerSalones"/>
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

export default CircuitoSetting