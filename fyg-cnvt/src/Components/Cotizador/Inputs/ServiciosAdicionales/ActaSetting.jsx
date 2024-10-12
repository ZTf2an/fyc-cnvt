import { useEffect, useState } from "react"

function ActaSetting ({value}){
    const [actaIsChecked , setActaIsChecked] = useState(true);
    // console.log(value);

    useEffect(()=>{
        if(value !== undefined){
            setActaIsChecked(value);
        };
    },[value]);

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
                        value={actaIsChecked ? 'on' : 'off'}
                        onChange={e=>e}
                    />
                </span>
            </div>
        </div>
    )
}

export default ActaSetting