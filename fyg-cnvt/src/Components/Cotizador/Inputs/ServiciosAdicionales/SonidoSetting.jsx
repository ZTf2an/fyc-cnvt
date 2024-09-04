import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BsPlusCircleFill , BsDashCircleFill } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function SonidoSetting () {
    const [checked , setChecked] = useState(true);
    const [editIsClosed , setEditIsClosed] = useState(true);

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className={`${!checked && "text-decoration-line-through"} form-control`} value="Sonido" disabled/>
                <span className="input-group-text">
                    <BsPencilSquare
                        className="me-1"
                        role="button" 
                        hidden={!checked}
                        checked={checked}
                        onClick={e=>setEditIsClosed(!editIsClosed)}
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerSonido" 
                        onClick={e=>setChecked(!checked)} 
                        onChange={e=>e}
                        checked={checked}
                    />
                </span>                        
            </div>
            <div name="contenedor-sonido" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"Cabinas"} defaultLot={2}/>
                </div>
                <div className="row mb-1">
                    <ItemModifier item={"Microfonos"} defaultLot={4} />
                </div>
                    <ItemModifier item={"Patinadores"} defaultLot={2} />
            </div>
        </div>
    )
}

export default SonidoSetting