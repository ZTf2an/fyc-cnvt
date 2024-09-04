import { useState } from "react"

function ActaSetting ( ){
    const [actaIsChecked , setActaIsChecked] = useState(true)
    return (
        <div className="col-md-4 border-end">
            <div className="input-group">
                <input className={`${!actaIsChecked && "text-decoration-line-through"} form-control`} type="text" value="Acta" disabled/>
                <span className="input-group-text">
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerActa" 
                        onClick={ e => setActaIsChecked(!actaIsChecked)}
                        checked={actaIsChecked}
                        onChange={e=>e}
                    />
                </span>
            </div>
        </div>
    )
}

export default ActaSetting