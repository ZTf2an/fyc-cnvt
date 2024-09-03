import Cliente from "./Inputs/Cliente"
import Email from "./Inputs/Email"
import Fecha from "./Inputs/Fecha"
import Tel from "./Inputs/Tel"
import Modalidades from "./Inputs/Modalidades"
import PrediosValor from "./Inputs/PrediosValor"
import DescInc from "./Inputs/DescInc"
import ValoresAdicionales from "./Inputs/ValoresAdicionales"
import ServiciosAdicionales from "./Inputs/ServiciosAdicionales"

function Cotizador () {
    return(
    <form className="row g-3 needs-validation" id="crearRegistro" noValidate>
        <Cliente/>
        <Fecha/>
        <Email/>
        <Tel />
        <Modalidades /> 
        <PrediosValor />
        <DescInc />
        <ValoresAdicionales />
        <ServiciosAdicionales />
            
    </form> 
    )
}


export default Cotizador