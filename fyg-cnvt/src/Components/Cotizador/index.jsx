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
    const mySubmit = (e) => {
        e.preventDefault();

        let params = {}

        for (let i = 0 ; i < e.target.length ; i++) {
            params[e.target[i].name] = e.target[i].value
        }

        console.log(params)

        let url2 = 'https://script.google.com/macros/s/AKfycbzgl9vmX89mpKcjsCv294JfWOLX9a8DUxtrIeHsfasF4QQkj0gD8EgO1HUfz4HWYrg/exec'
        fetch(`${url2}?type=cot`,{
            method : 'POST' ,
            mode : 'no-cors' ,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({"nombre" : 'Boren' , "contrasena" : "BorenElRoscon28"})
})
    .then(response => response.json())
    .then(data => console.log('Respuesta : ' , data))
    .catch(error => console.log('Ocurrió un error: ' , error))
    }
    return(
            <form 
                className="row g-3 needs-validation" 
                id="crearRegistro" 
                noValidate
                onSubmit={e => mySubmit(e)}
            >
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