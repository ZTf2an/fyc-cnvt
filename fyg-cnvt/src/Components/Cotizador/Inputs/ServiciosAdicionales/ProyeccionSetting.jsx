import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function ProyeccionSetting() {
    const [checked , setChecked] = useState(true);
    const [editIsClosed , setEditIsClosed] = useState(true);

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className={`${!checked && "text-decoration-line-through"} form-control`} value="Video Beam" disabled/>
                <span className="input-group-text">
                    <BsPencilSquare 
                        className="me-1"
                        role="button" 
                        onClick={e=>setEditIsClosed(!editIsClosed)}
                        hidden={!checked}
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        onClick={e=>setChecked(!checked)} 
                        onChange={e=>e}
                        name="inputSerVideoBeam1" 
                        checked={checked}
                    />
                </span>
            </div>
            <div name="contenedor-videoBeam" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"Video Beam"} defaultLot={1} />
                </div>
                <div className="row mb-1">
                    <ItemModifier item={"Telon"} defaultLot={1}/>
                </div>
            </div>                      
        </div>
    )
}

export default ProyeccionSetting