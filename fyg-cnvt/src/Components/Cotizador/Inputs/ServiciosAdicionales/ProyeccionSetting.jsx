import { useState , useEffect} from "react";
import { BsPencilSquare } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier"

function ProyeccionSetting({value}) {
    const [checked , setChecked] = useState(true);
    const [editIsClosed , setEditIsClosed] = useState(true);
    const [videoBeam , setVideoBeam] = useState(1);
    const [telon , setTelon] = useState(1)

    useEffect(()=>{
        if(value !== undefined){
            setChecked(value.isRequired);
            setVideoBeam(parseInt(value.videobeam));
            setTelon(parseInt(value.telon));
        };
    },[value]);

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
                        value={checked ? 'on' : 'off'}
                        onChange={e=>e}
                        name="inputSerVideoBeam1" 
                        checked={checked}
                    />
                </span>
            </div>
            <div name="contenedor-videoBeam" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"📽️"} textHelp={"Video Beam"} amount={videoBeam} setAmount={setVideoBeam}/>
                </div>
                <div className="row mb-1">
                    <ItemModifier item={"Te..."} textHelp={"Telon"} amount={telon} setAmount={setTelon}/>
                </div>
            </div>                      
        </div>
    )
}

export default ProyeccionSetting