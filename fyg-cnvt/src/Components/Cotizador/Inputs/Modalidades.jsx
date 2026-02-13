import { useEffect, useState } from "react"
import { FaRegCheckCircle , FaCheckCircle } from "react-icons/fa";
import { useCotizador } from "../useCotizador";

function Modalidades ({values , updateValues}) {
    
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
                    checked={values.virtual == 'on'} 
                    value={values.virtual} 
                    onChange={e => updateValues.setVirtual(toggleCheck(values.virtual))}
                />
                <label htmlFor="flexCheckMVirtual">Virtual</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMVirtualA" 
                    name="flexCheckMVirtualA" 
                    className="form-check-input" 
                    checked={values.virtualAcomp == 'on'} 
                    value={values.virtualAcomp} 
                    onChange={e => updateValues.setVirtualAcomp(toggleCheck(values.virtualAcomp))}
                />
                <label htmlFor="flexCheckMVirtualA">Virtual con Acompañamiento</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialT" 
                    name="flexCheckMPresencialT" 
                    className="form-check-input" 
                    checked={values.tarjetas == 'on'} 
                    value={values.tarjetas} 
                    onChange={e => updateValues.setTarjetas(toggleCheck(values.tarjetas))}
                />
                <label htmlFor="flexCheckMPresencialT">Presencial con Tarjetas</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialC" 
                    name="flexCheckMPresencialC" 
                    className="form-check-input" 
                    checked={values.controles == 'on'} 
                    value={values.controles} 
                    onChange={e => updateValues.setControles(toggleCheck(values.controles))}
                />
                <label htmlFor="flexCheckMPresencialC">Presencial con Controles</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialQR" 
                    name="flexCheckMPresencialQR" 
                    className="form-check-input" 
                    checked={values.qr == 'on'} 
                    value={values.qr} 
                    onChange={e => updateValues.setQr(toggleCheck(values.qr))}
                />
                <label htmlFor="flexCheckMPresencialQR">Presencial con QR code</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMPresencialSE" 
                    name="flexCheckMPresencialSE" 
                    className="form-check-input" 
                    checked={values.soloEquipos == 'on'} 
                    value={values.soloEquipos} 
                    onChange={e => updateValues.setSoloEquipos(toggleCheck(values.soloEquipos))}
                />
                <label htmlFor="flexCheckMPresencialSE">Presencial Solo Equipos</label>
            </div>
            <div className="form-check mb-2">
                <input 
                    type="checkbox" 
                    id="flexCheckMMixta" 
                    name="flexCheckMMixta" 
                    className="form-check-input" 
                    checked={values.mixta == 'on'} 
                    value={values.mixta} 
                    onChange={e => updateValues.setMixta(toggleCheck(values.mixta))}
                />
                <label htmlFor="flexCheckMMixta">Mixta</label>
            </div>
            <input 
                type="checkbox" 
                id="input-validarModalidad" 
                checked={[ 
                    values.virtual,
                    values.controles,
                    values.tarjetas,
                    values.qr,
                    values.mixta,
                    values.soloEquipos,
                    values.virtualAcomp
                ].some(el => el == 'on')} 
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