import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function CircuitoSetting({value}) {
    const [checked , setChecked] = useState(false);
    const [editIsClosed , setEditIsClosed] = useState(true);
    const [salones , setSalones] = useState(2);

    useEffect(()=>{
        if(value !== undefined){
            setChecked(value.isRequired);
            setSalones(parseInt(value.salones));
        }
    },[value])

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input 
                    className={`${!checked && "text-decoration-line-through"} form-control`} 
                    value="Circuito Cerrado" 
                    onChange={e=>e} 
                    disabled
                />
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
                        name="inputSerCircuitoCerrado"
                        value={checked ? 'on' : 'off'}
                        checked={checked}
                        onChange={e=>e}
                        
                    />
                </span>
            </div>
            <div name="contenedor-circuitoCerrado" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"Salones"} textHelp={"Salones"} amount={salones} setAmount={setSalones}/>
                </div>
            </div>                    
        </div>
    )
}

export default CircuitoSetting