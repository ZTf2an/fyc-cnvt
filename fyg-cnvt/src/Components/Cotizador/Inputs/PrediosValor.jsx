import DescInc from "./DescInc";
function PrediosValor ({
    prediosChange ,  
    defaultValorVirtual ,
    defaultValorTarjetas ,
    defaultValorControles ,
    defaultValorQR ,
    defaultValorMixta ,
    changeDefaultValorVirtual ,
    changeDefaultValorTarjetas ,
    changeDefaultValorControles ,
    changeDefaultValorQR ,
    changeDefaultValorMixta ,
    descuentoIsChecked ,
    incrementoIsChecked ,
    setDescuentoIsChecked ,
    setIncrementoIsChecked ,
    setDescuentoCoef ,
    descuentoCoef ,
    setIncrementoCoef ,
    incrementoCoef ,
    prediosDefault}) {
    const formatNumber = (input) => {
        if (isNaN(input)) {
            return ""
        } else {
            return input
        }
    };

    return (<>
        <div className="col-md-3">
            <div className=" mb-3">
                <label htmlFor="inputPredios" className="form-label">Predios</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="inputPredios" 
                    name="inputPredios" 
                    placeholder="Ej: 100" 
                    value={formatNumber(prediosDefault)}
                    onChange={e => {
                        prediosChange(e.target.value);
                    }}
                    required
                />
                <div className="invalid-feedback">
                Digita numero de predios.
                </div>
            </div>
            <DescInc
                descChec={descuentoIsChecked}
                incCheck={incrementoIsChecked}
                descChange={setDescuentoIsChecked}
                incChange={setIncrementoIsChecked}
                descontar={setDescuentoCoef}
                descuento={descuentoCoef}
                incrementar={setIncrementoCoef}
                incremento={incrementoCoef}
            />
        </div>
            <div className="col-md-6">
                <div>
                    <label htmlFor="inputValorVir" className="form-label">Valor Virtual</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#9BC2E6"}} 
                        id="inputValorVir" 
                        name="inputValorVir" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorVirtual)}
                        onChange={e=>changeDefaultValorVirtual(e.target.value)}
                        required
                        />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
                <div>
                    <label htmlFor="inputValorPT" className="form-label">Valor Presencial Tarjetas</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#92D050"}}  
                        id="inputValorPT" 
                        name="inputValorPT" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorTarjetas)}
                        onChange={e=>changeDefaultValorTarjetas(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
                <div>
                    <label htmlFor="inputValorPCR" className="form-label">Valor Presencial Controles</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#F4B084"}}  
                        id="inputValorPCR" 
                        name="inputValorPCR" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorControles)}
                        onChange={e=>changeDefaultValorControles(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
                <div hidden>
                    <label htmlFor="inputValorPQR" className="form-label">Valor Presencial QR code</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#00B0F0"}}  
                        id="inputValorPQR" 
                        name="inputValorPQR" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorQR)}
                        onChange={e=>changeDefaultValorQR(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
                <div>
                    <label htmlFor="inputValorM" className="form-label">Valor Mixta</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#a9d08e"}}  
                        id="inputValorM" 
                        name="inputValorM" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorMixta)}
                        onChange={e=>changeDefaultValorMixta(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
            </div>
    </>)

}

export default PrediosValor