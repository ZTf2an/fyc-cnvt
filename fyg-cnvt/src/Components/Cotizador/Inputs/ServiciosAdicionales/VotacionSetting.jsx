import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import ItemModifier from "../../../ItemModifier"

function VotacionSetting () {
    const [checked , setChecked] = useState(true)
    const [editIsClosed , setEditIsClosed] = useState(true)

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className={`${!checked && "text-decoration-line-through"} form-control`} value="Votación" disabled onChange={e=>e}/>
                <span className="input-group-text">
                    <BsPencilSquare 
                        className="me-1" 
                        role="button" 
                        hidden={!checked}
                        onClick={e=>setEditIsClosed(!editIsClosed)}
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        onClick={e=>setChecked(!checked)} 
                        onChange={e=>e} 
                        value={checked ? 'on' : 'off'}
                        name="inputSerVotacion" 
                        checked={checked}
                    />
                </span>
            </div>
            <div name="contenedor-votacion" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"Logisticos"} defaultLot={2}/>
                </div>
            </div>
        </div>
    )
}
export default VotacionSetting