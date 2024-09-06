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
import { API_GAS } from "../../Globals/GAS"


function Cotizador () {
    const context = useContext(CotizadorContext);
    const mySubmit = (e) => {
        e.preventDefault();

        let params = {}

        for (let i = 0 ; i < e.target.length ; i++) {
            if (e.target[i].name != "") {
                params[e.target[i].name] = e.target[i].value
            } 
        }

        console.log(params)
        // const url = 'https://corsproxy.io/?'+encodeURIComponent(API_GAS);
        // https://cors-anywhere.herokuapp.com/
        // fetch(`https://corsproxy.io/?${API_GAS}?type=cot`,{
        fetch(API_GAS,{
            redirect : 'follow',
            // mode : 'no-cors' ,
            method : 'POST' ,
            headers : {
                'Content-Type' : '"text/plain;charset=utf-8'
                // 'Origin' : '*',
            },
            body : JSON.stringify(params)
        })
            // .then(response => console.log(response))
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