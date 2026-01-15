import { useState , useEffect} from "react";
import { BsPencilSquare } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function ProyeccionSetting({value ,setValue}) {
    const [editIsClosed , setEditIsClosed] = useState(true);
    //se borró todo porque reposa en SonidoSettings

    const setChangesToValue = (changes) => {
        let newObj = {proyeccion : {...value , ...changes}}; 
        // console.log(newObj);
        setValue(newObj);
    };


    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className={`${!value.isRequired && "text-decoration-line-through"} form-control`} value="Video Beam" disabled/>
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
                        onClick={e=>setChangesToValue({isRequired : !value.isRequired})} 
                        value={value.isRequired ? 'on' : 'off'}
                        onChange={e=>e}
                        name="inputSerVideoBeam1" 
                        checked={value.isRequired}
                    />
                </span>
            </div>
            <div name="contenedor-videoBeam" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"📽️"} textHelp={"Video Beam"} amount={value.videobeam} setAmount={r => setChangesToValue({videobeam:parseInt(r)})}/>
                </div>
                <div className="row mb-1">
                    <ItemModifier item={"Te..."} textHelp={"Telon"} amount={value.telon} setAmount={r => setChangesToValue({telon:parseInt(r)})}/>
                </div>
            </div>                      
        </div>
    )
}

export default ProyeccionSetting