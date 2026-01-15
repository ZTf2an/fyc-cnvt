import { BsPencilSquare } from "react-icons/bs";
import { useState , useEffect} from "react";
import ItemModifier from "../../../ItemModifier"

function VotacionSetting ({value , setValue}) {
    const [editIsClosed , setEditIsClosed] = useState(true);
    //se borró todo porque reposa en SonidoSettings

    const setChangesToValue = (changes) => {
        let newObj = {votacion : {...value , ...changes}}; 
        // console.log(newObj);
        setValue(newObj);
    };

    return (
        <div className="col-md-4 border-end border-start">
            <div className="input-group mb-2">
                <input className={`${!value.isRequired && "text-decoration-line-through"} form-control`} value="Votación" disabled onChange={e=>e}/>
                <span className="input-group-text">
                    <BsPencilSquare 
                        className="me-1" 
                        role="button" 
                        hidden={!value.isRequired}
                        onClick={e=>setEditIsClosed(!editIsClosed)}
                    />
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        onClick={e=>setChangesToValue({isRequired : !value.isRequired})} 
                        onChange={e=>e} 
                        value={value.isRequired ? 'on' : 'off'}
                        name="inputSerVotacion" 
                        checked={value.isRequired}
                    />
                </span>
            </div>
            <div name="contenedor-votacion" className="esconder-mostrar-contenedor" hidden={editIsClosed}>
                <div className="row mb-1">
                    <ItemModifier item={"🕴🏽"} textHelp={"Logisticos"} amount={value.logisticos} setAmount={r => setChangesToValue({logisticos:parseInt(r)})}/>
                    {/* <div className="input-group mt-1" title={"Controles"}>
                        <span className="input-group-text" >
                            {"📟"}
                        </span>
                        <input className="form-control" type="number" value={controles} name={`inputSerControles`} onChange={e=>e}/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default VotacionSetting