import { BsPencilSquare } from "react-icons/bs";

function DescInc ({descChec , incCheck , descChange , incChange , descontar , incrementar , descuento , incremento}) {
    return ( 
        <div className="col-md-3">
            <div className="mb-3">
            <label htmlFor="input-descuento" className="form-label">Descuento</label>
            <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">
                    <BsPencilSquare 
                        role="button" 
                        id="button-edit-DescuentoForm" 
                        onClick={e=>{
                            descChange(!descChec)
                        }}
                    />
                </span>
                <input 
                    type="number" 
                    className="form-control" 
                    id="input-descuento" 
                    name="inputDescuento" 
                    placeholder="Ej: 10"
                    defaultValue={descChec ? descuento : ""}
                    onChange={e=>descontar(e.target.value)}
                    disabled={!descChec}
                />
            </div>
            </div>
            <div>
            <label htmlFor="input-incremento" className="form-label">Incremento</label>
            <div className="input-group">
                <span className="input-group-text">
                    <BsPencilSquare 
                        role="button" 
                        id="button-edit-IncrementoForm" 
                        onClick={e=>{
                            incChange(!incCheck);
                        }}
                    />
                </span>
                <input 
                    type="number" 
                    className="form-control" 
                    id="input-incremento" 
                    name="inputIncremento" 
                    placeholder="Ej: 10" 
                    defaultValue={incCheck ? incremento : ""}
                    onChange={e=>incrementar(e.target.value)}
                    disabled={!incCheck}
                />
            </div>            
            </div>
        </div>

    )
}

export default DescInc