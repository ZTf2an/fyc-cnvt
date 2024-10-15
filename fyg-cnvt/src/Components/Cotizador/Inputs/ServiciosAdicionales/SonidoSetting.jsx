import { useState ,useEffect} from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BsPlusCircleFill , BsDashCircleFill } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function SonidoSetting ({value}) {
    // console.log(value)
    const [checked , setChecked] = useState(true);
    const [editIsClosed , setEditIsClosed] = useState(true);
    const [defaultCabinas , setDefaultCabinas] = useState(4);
    const [defaultMicrofonos , setDefaultMicrofonos] = useState(4);
    const [defaultLogisticos , setDefaultLogisticos] = useState(4);
    
    useEffect(()=>{
        if(value !== undefined){
            setChecked(value.isRequired);
            setDefaultCabinas(parseInt(value.cabinas));
            setDefaultMicrofonos(parseInt(value.microfonos));
            setDefaultLogisticos(parseInt(value.patinadores));
        };
    },[value]);

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
                        value={checked ? 'on' : 'off'}
                        onChange={e=>e}
                        checked={checked}
                    />
                </span>                        
            </div>
            <div name="contenedor-sonido" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"🔈"} textHelp={"Cabinas"} amount={defaultCabinas} setAmount={setDefaultCabinas}/>
                </div>
                <div className="row mb-1">
                    <ItemModifier item={"🎤"} textHelp={"Microfonos"} amount={defaultMicrofonos} setAmount={setDefaultMicrofonos} />
                </div>
                    <ItemModifier item={"🙋🏽‍♂️"} textHelp={"Patinadores"} amount={defaultLogisticos} setAmount={setDefaultLogisticos}/>
            </div>
        </div>
    )
}

export default SonidoSetting