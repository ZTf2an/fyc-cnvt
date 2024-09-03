function Modalidades ({filled , changer , modeState}) {
    return (
        <div className="col-md-3">
            <h4>Modalidad</h4>
            <div className="form-check mb-2">
                <input type="checkbox" id="flexCheckMVirtual" className="form-check-input" onChange={e => (changer({...modeState , v: !modeState.v}))}/>
                <label htmlFor="flexCheckMVirtual">Virtual</label>
            </div>
            <div className="form-check mb-2">
                <input type="checkbox" id="flexCheckMPresencialT" className="form-check-input" onChange={e=>changer({...modeState ,pt: !modeState.pt})}/>
                <label htmlFor="flexCheckMPresencialT">Presencial con Tarjetas</label>
            </div>
            <div className="form-check mb-2">
                <input type="checkbox" id="flexCheckMPresencialC" className="form-check-input" onChange={e=>changer({...modeState ,pc: !modeState.pc})}/>
                <label htmlFor="flexCheckMPresencialC">Presencial con Controles</label>
            </div>
            <div className="form-check mb-2">
                <input type="checkbox" id="flexCheckMMixta" className="form-check-input" onChange={e=>changer({...modeState ,m: !modeState.m})}/>
                <label htmlFor="flexCheckMMixta">Mixta</label>
            </div>
            <input type="checkbox" id="input-validarModalidad" checked={filled} onChange={e=>console.log(e)} required hidden/>
            <div className="invalid-feedback">
            Debe seleccionar al menos 1 Modalidad.
            </div>
        </div>
    )
}

export default Modalidades