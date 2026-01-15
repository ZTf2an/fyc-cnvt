import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function CircuitoSetting({value , setValue}) {
    const [editIsClosed , setEditIsClosed] = useState(true);

    const setChangesToValue = (changes) => {
        let newObj = {cctv : {...value , ...changes}}; 
        // console.log(newObj);
        setValue(newObj);
    };

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input 
                    className={`${!value.isRequired && "text-decoration-line-through"} form-control`} 
                    value="Circuito Cerrado" 
                    onChange={e=>e} 
                    disabled
                />
                <span className="input-group-text">
                    <BsPencilSquare
                    className="me-1"
                        role="button" 
                        onClick={e=>setEditIsClosed(!editIsClosed)} 
                        hidden={!value.isRequired}
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        // onClick={e=>setChecked(!checked)}
                        onClick={e=>setChangesToValue({isRequired : !value.isRequired})}
                        name="inputSerCircuitoCerrado"
                        value={value.isRequired ? 'on' : 'off'}
                        checked={value.isRequired}
                        onChange={e=>e}
                        
                    />
                </span>
            </div>
            <div name="contenedor-circuitoCerrado" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"Salones"} textHelp={"Salones"} amount={value.salones} setAmount={r => setChangesToValue({salones:parseInt(r)})}/>
                </div>
            </div>                    
        </div>
    )
}

export default CircuitoSetting