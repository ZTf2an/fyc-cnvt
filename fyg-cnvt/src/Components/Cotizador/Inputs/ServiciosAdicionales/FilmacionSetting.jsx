import { useState , useEffect} from "react"

function FilmacionSetting({value , setValue}) {
    // const [checked , setChecked] = useState(true);
    
    // useEffect(()=>{
    //     if(value !== undefined){
    //         setChecked(value);
    //     };
    // },[value]);

    return (
        <div className="col-md-4 border-end">
            <div className="input-group">
                <input className={`${!value && "text-decoration-line-through"} form-control`} value="Filmación" disabled/>
                <span className="input-group-text">
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerFilmacion" 
                        onClick={e => setValue({filmacion:{isRequired :!value}})}
                        checked={value}
                        value={value ? 'on' : 'off'}
                        onChange={e=>e}
                    />
                </span>
            </div>                      
        </div>
    )
}
export default FilmacionSetting