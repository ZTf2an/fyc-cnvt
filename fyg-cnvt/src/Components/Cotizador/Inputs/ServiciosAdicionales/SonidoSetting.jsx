import { useState ,useEffect} from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BsPlusCircleFill , BsDashCircleFill } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function SonidoSetting ({value , setValue}) {
    // console.log(value)
    // const [checked , setChecked] = useState(true);
    const [editIsClosed , setEditIsClosed] = useState(true);
    // const [defaultCabinas , setDefaultCabinas] = useState(2);
    const [defaultMicrofonos , setDefaultMicrofonos] = useState(3);
    const [defaultLogisticos , setDefaultLogisticos] = useState(2);
    
    // useEffect(()=>{
    //     if(value !== undefined){
    //         setChecked(value.isRequired);
    //         setDefaultCabinas(parseInt(value.cabinas));
    //         setDefaultMicrofonos(parseInt(value.microfonos));
    //         setDefaultLogisticos(parseInt(value.patinadores));
    //     };
    // },[value]);

    const setChangesToValue = (changes) => {
        let newObj = {sonido : {...value , ...changes}}; 
        // console.log(newObj);
        setValue(newObj);
    };

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className={`${!value.isRequired && "text-decoration-line-through"} form-control`} value="Sonido" disabled/>
                <span className="input-group-text">
                    <BsPencilSquare
                        className="me-1"
                        role="button" 
                        hidden={!value.isRequired}
                        checked={value.isRequired}
                        onClick={e=>setEditIsClosed(!editIsClosed)}
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerSonido" 
                        onClick={e=>setChangesToValue({isRequired :!value.isRequired})} 
                        value={value ? 'on' : 'off'}
                        onChange={e=>e}
                        checked={value.isRequired}
                    />
                </span>                        
            </div>
            <div name="contenedor-sonido" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"🔈"} textHelp={"Cabinas"} amount={value.cabinas} setAmount={r => setChangesToValue({cabinas:parseInt(r)})}/>
                </div>
                <div className="row mb-1">
                    <ItemModifier item={"🎤"} textHelp={"Microfonos"} amount={value.microfonos} setAmount={r => setChangesToValue({microfonos:parseInt(r)})} />
                </div>
                    <ItemModifier item={"🙋🏽‍♂️"} textHelp={"Patinadores"} amount={value.patinadores} setAmount={r => setChangesToValue({patinadores:parseInt(r)})}/>
            </div>
        </div>
    )
}

export default SonidoSetting