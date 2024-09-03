import Cliente from "./Inputs/Cliente"
import Email from "./Inputs/Email"
import Fecha from "./Inputs/Fecha"
import Tel from "./Inputs/Tel"
import Modalidades from "./Inputs/Modalidades"
import PrediosValor from "./Inputs/PrediosValor"
import DescInc from "./Inputs/DescInc"
import ValoresAdicionales from "./Inputs/ValoresAdicionales"
import ServiciosAdicionales from "./Inputs/ServiciosAdicionales"
import { useContext } from "react"
import { CotizadorContext, CotizadorProvider } from "./Context"


function Cotizador () {
    const context = useContext(CotizadorContext);
    return(
            <form className="row g-3 needs-validation" id="crearRegistro" noValidate>
                <Cliente/>
                <Fecha/>
                <Email/>
                <Tel />
                <Modalidades 
                    filled={context.oneMinimalModeSelected} 
                    changer={context.setModesSelected} 
                    modeState={context.modesSelected}
                /> 
                <PrediosValor 
                    prediosChange={context.setNumeroPredios}
                    defaultValor={context.defaultValor}
                    changeDefaultValor={context.setDefaultValor}
                />
                <DescInc 
                    descChec={context.descuentoIsChecked}
                    incCheck={context.incrementoIsChecked}
                    descChange={context.setDescuentoIsChecked}
                    incChange={context.setIncrementoIsChecked}
                    descontar={context.setDescuentoCoef}
                    descuento={context.descuentoCoef}
                    incrementar={context.setIncrementoCoef}
                    incremento={context.incrementoCoef}
                />
                <ValoresAdicionales />
                <ServiciosAdicionales />
                    
            </form> 
    )
}


export default Cotizador