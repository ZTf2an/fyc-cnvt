
function PrediosValor ({prediosChange ,  defaultValor , changeDefaultValor , prediosDefault}) {
    const formatNumber = (input) => {
        if (isNaN(input)) {
            return ""
        } else {
            return input
        }
    };

    return (
        <div className="col-md-6">
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
            <div>
                <label htmlFor="inputValor" className="form-label">Valor</label>
                <input 
                    type="text" 
                    className="form-control fs-4 text-end" 
                    id="inputValor" 
                    name="inputValor" 
                    placeholder="Normalmente automatico" 
                    value={formatNumber(defaultValor)}
                    onChange={e=>changeDefaultValor(e.target.value)}
                    required
                />
                <div className="invalid-feedback">
                    Digitar valor, Normalmente es automatico.
                </div>
            </div>
        </div>
    )

}

export default PrediosValor