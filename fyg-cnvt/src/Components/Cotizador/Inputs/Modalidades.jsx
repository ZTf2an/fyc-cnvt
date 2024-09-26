import { useState } from "react"

function Modalidades () {
    const [presencialT , setPresencialT] = useState(false);
    const [virtual , setVirtual] = useState(false);
    const [presencialC , setpresencialC] = useState(false);
    const [mixta , setMixta] = useState(false);

    return (
        <div className="col-md-3">
            <h4>Modalidad</h4>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMVirtual" 
                    name="flexCheckMVirtual" 
                    className="form-check-input" 
                    checked={virtual} 
                    value={virtual ? 'on' : 'off'} 
                    onChange={e => setVirtual(e.target.checked)}
                />
                <label htmlFor="flexCheckMVirtual">Virtual</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialT" 
                    name="flexCheckMPresencialT" 
                    className="form-check-input" 
                    checked={presencialT} 
                    value={presencialT ? 'on' : 'off'} 
                    onChange={e => setPresencialT(e.target.checked)}
                />
                <label htmlFor="flexCheckMPresencialT">Presencial con Tarjetas</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialC" 
                    name="flexCheckMPresencialC" 
                    className="form-check-input" 
                    checked={presencialC} 
                    value={presencialC ? 'on' : 'off'} 
                    onChange={e => setpresencialC(e.target.checked)}
                />
                <label htmlFor="flexCheckMPresencialC">Presencial con Controles</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMMixta" 
                    name="flexCheckMMixta" 
                    className="form-check-input" 
                    checked={mixta} 
                    value={mixta ? 'on' : 'off'} 
                    onChange={e => setMixta(e.target.checked)}
                />
                <label htmlFor="flexCheckMMixta">Mixta</label>
            </div>
            <input type="checkbox" id="input-validarModalidad" checked={[virtual,presencialC,presencialT,mixta].some(el => el)} onChange={e => e} required hidden/>
            <div className="invalid-feedback">
            Debe seleccionar al menos 1 Modalidad.
            </div>
        </div>
    )
}

export default Modalidades