import { useCotizador } from "../useCotizador";
import DescInc from "./DescInc";
function PrediosValor ({
    prediosChange ,  
    defaultValorVirtual ,
    defaultValorTarjetas ,
    defaultValorControles ,
    defaultValorQR ,
    defaultValorSoloEquipos ,
    defaultValorVirtualAcomp ,
    changeDefaultValorVirtualAcomp ,
    changeDefaultValorPSE,
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
    prediosDefault ,
    modalidades }) {

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
                <div hidden={modalidades.virtual !== "on"}>
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
                <div hidden={modalidades.virtualAcomp !== "on"}>
                    <label htmlFor="inputValorVir" className="form-label">Valor Virtual con Acompañamiento</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#e6db9b"}} 
                        id="inputValorVirAc" 
                        name="inputValorVirAc" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorVirtualAcomp)}
                        onChange={e=>changeDefaultValorVirtualAcomp(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
                <div hidden={modalidades.tarjetas !== "on"}>
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
                <div hidden={modalidades.controles !== "on"}>
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
                <div hidden={modalidades.qr !== "on"}>
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
                <div hidden={modalidades.soloEquipos !== "on"}>
                    <label htmlFor="inputValorPQR" className="form-label">Valor Presencial Solo Equipos</label>
                    <input 
                        type="text" 
                        className="form-control text-end" 
                        style={{"backgroundColor": "#f0c0da"}}  
                        id="inputValorPSE" 
                        name="inputValorPSE" 
                        placeholder="Normalmente automatico" 
                        value={formatNumber(defaultValorSoloEquipos)}
                        onChange={e=>changeDefaultValorPSE(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                      Digitar valor, Normalmente es automatico.
                    </div>
                </div>
                <div hidden={modalidades.mixta !== "on"}>
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
                <div hidden={[ 
                        modalidades.virtual,
                        modalidades.controles,
                        modalidades.tarjetas,
                        modalidades.qr,
                        modalidades.mixta,
                        modalidades.soloEquipos,
                        modalidades.virtualAcomp
                    ].some(el => el == 'on')} 
                    className="text"
                    style={{
                        textAlign: "center",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        background: "linear-gradient(90deg, #bbddff, #c8c5fc)",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        margin: "20px 5px"
                    }}
                >
                    Escoge las modalidades para ver valores ...
                </div>
            </div>
    </>)

}

export default PrediosValor