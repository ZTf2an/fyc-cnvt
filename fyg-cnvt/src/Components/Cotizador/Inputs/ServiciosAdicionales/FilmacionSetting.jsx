import { useState } from "react"

function FilmacionSetting() {
    const [checked , setChecked] = useState(true);
    return (
        <div className="col-md-4 border-end">
            <div className="input-group">
                <input className={`${!checked && "text-decoration-line-through"} form-control`} value="Filmación" disabled/>
                <span className="input-group-text">
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerFilmacion" 
                        onClick={e => setChecked(!checked)}
                        checked={checked}
                        value={checked ? 'on' : 'off'}
                        onChange={e=>e}
                    />
                </span>
            </div>                      
        </div>
    )
}
export default FilmacionSetting