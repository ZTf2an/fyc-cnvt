import { useState , useEffect} from "react"
import { BsPencilSquare } from "react-icons/bs";
import ItemModifier from "../../../ItemModifier";

function FilmacionSetting({value , setValue}) {
    const [editIsClosed , setEditIsClosed] = useState(true);

    const setChangesToValue = (changes) => {
        let newObj = {filmacion : {...value , ...changes}};
        setValue(newObj);
    };

    return (
        <div className="col-md-4 border-end">
            <div className="input-group mb-2">
                <input className={`${!value.isRequired && "text-decoration-line-through"} form-control`} value="Filmación" disabled/>
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
                        name="inputSerFilmacion" 
                        onClick={e => setChangesToValue({isRequired :!value.isRequired})}
                        checked={value.isRequired}
                        value={value ? 'on' : 'off'}
                        onChange={e=>e}
                    />
                </span>
            </div>
            <div name="contenedor-filmacion" className="esconder-mostrar-contenedor" hidden={editIsClosed || !value.isRequired}>
                <ItemModifier item={"📹"} textHelp={"Camaras"} amount={value.camaras} setAmount={r => setChangesToValue({camaras:parseInt(r)})}/>
            </div>                    
        </div>
    )
}
export default FilmacionSetting