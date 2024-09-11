function ValoresAdicionales () {
    return (
    <div className="col-md-4 mb-3">
        <div className="accordion">
            <div className="accordion-item border-top-0 border-start-0 border-end-0">
                <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Valores Adicionales
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <label className="form-label">Valor de acompañamiento <strong>Virtual</strong></label>
                        <input 
                            className="form-control text-end" 
                            type="number" 
                            value="500.000" 
                            name="inputValorAcoVirtual" 
                            onChange={e => console.log(e)}
                            required
                        />
                        <label className="form-label">Valor adicional de transportes o viaticos <strong>Presencial</strong></label>
                        <input 
                            className="form-control text-end" 
                            type="number" 
                            value="0" 
                            name="inputValorAcoPresencial"
                            onChange={e => console.log(e)} 
                            required
                        />
                        <label className="form-label">Valor adicional por <strong>Controles</strong></label>
                        <input 
                            className="form-control text-end" 
                            type="number" 
                            value="0" 
                            name="inputValorControles"
                            onChange={e => console.log(e)} 
                            required
                        />
                        <label className="form-label"> Valor de acompañamiento <strong>Mixta</strong></label>
                        <input 
                            className="form-control text-end" 
                            type="number" 
                            value="800.000" name="inputValorAcoMixta"
                            onChange={e => console.log(e)}
                        />
                    </div>
                </div>
            </div>
        </div> 
    </div>
    )
}

export default ValoresAdicionales