import { useEffect, useState } from "react"
import { FaRegCheckCircle , FaCheckCircle } from "react-icons/fa";

function Modalidades ({valueV , valueM , valueP , valuePC , valuePQR}) {
    
    const [presencialT , setPresencialT] = useState("");
    const [presencialC , setPresencialC] = useState("");
    const [presencialQR , setPresencialQR] = useState("");
    const [virtual , setVirtual] = useState("");
    const [mixta , setMixta] = useState("");
    
    useEffect(() => {
        setVirtual(check(valueV));
        setPresencialT(check(valueP));
        setPresencialC(check(valuePC));
        setMixta(check(valueM));
        setPresencialQR(check(valuePQR));
    },[valueV , valueM , valueP , valuePC])

    const check = (state)=> {
        if (state) {
            return 'on';
        } else {
            return 'off'
        }
    }
    
    const toggleCheck = (state) => {
        if (state == 'on') {
            return 'off'
        } else {
            return 'on'
        }
    }

    return (
        <div className="col-md-3">
            <h4>Modalidad</h4>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMVirtual" 
                    name="flexCheckMVirtual" 
                    className="form-check-input" 
                    checked={virtual == 'on'} 
                    value={virtual} 
                    onChange={e => setVirtual(toggleCheck(virtual))}
                />
                <label htmlFor="flexCheckMVirtual">Virtual</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialT" 
                    name="flexCheckMPresencialT" 
                    className="form-check-input" 
                    checked={presencialT == 'on'} 
                    value={presencialT} 
                    onChange={e => setPresencialT(toggleCheck(presencialT))}
                />
                <label htmlFor="flexCheckMPresencialT">Presencial con Tarjetas</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialC" 
                    name="flexCheckMPresencialC" 
                    className="form-check-input" 
                    checked={presencialC == 'on'} 
                    value={presencialC} 
                    onChange={e => setPresencialC(toggleCheck(presencialC))}
                />
                <label htmlFor="flexCheckMPresencialC">Presencial con Controles</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialQR" 
                    name="flexCheckMPresencialQR" 
                    className="form-check-input" 
                    checked={presencialQR == 'on'} 
                    value={presencialQR} 
                    onChange={e => setPresencialQR(toggleCheck(presencialQR))}
                />
                <label htmlFor="flexCheckMPresencialQR">Presencial con QR code</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMMixta" 
                    name="flexCheckMMixta" 
                    className="form-check-input" 
                    checked={mixta == 'on'} 
                    value={mixta} 
                    onChange={e => setMixta(toggleCheck(mixta))}
                />
                <label htmlFor="flexCheckMMixta">Mixta</label>
            </div>
            <input 
                type="checkbox" 
                id="input-validarModalidad" 
                checked={[virtual,presencialC,presencialT,presencialQR,mixta].some(el => el == 'on')} 
                onChange={e => e} 
                required
                hidden
            />
            <div className="invalid-feedback">
            Debe seleccionar al menos 1 Modalidad.
            </div>
        </div>
    )
}

export default Modalidades