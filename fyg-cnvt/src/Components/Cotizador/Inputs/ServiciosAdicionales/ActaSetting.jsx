import { useEffect, useState } from "react"

function ActaSetting ({value , setValue}){
    // const [actaIsChecked , setActaIsChecked] = useState(true);
    // console.log(value);

    // useEffect(()=>{
    //     if(value !== undefined){
    //         setActaIsChecked(value);
    //     };
    // },[value]);

    return (
        <div className="col-md-4 border-end">
            <div className="input-group">
                <input className={`${!value && "text-decoration-line-through"} form-control`} type="text" value="Acta" disabled/>
                <span className="input-group-text">
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        name="inputSerActa" 
                        onClick={ e => setValue({acta:{isRequired:!value}})}
                        checked={value}
                        value={value ? 'on' : 'off'}
                        onChange={e=>e}
                    />
                </span>
            </div>
        </div>
    )
}

export default ActaSetting