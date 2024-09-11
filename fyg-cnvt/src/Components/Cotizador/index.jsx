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
import { API_GAS , API_CNVT } from "../../Globals/GAS"


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

        const data = JSON.stringify(params);
        console.log(data);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", API_CNVT,true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json')
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log(this.responseText);
                grabaOK(response);
            }
        };
        xmlhttp.onerror = function () {
            console.log("Error ajax");
        };
        xmlhttp.send(data);

    }

    const grabaOK = (response) => {
        if(response.status=="success"){
            //acciones si fue correcto
            alert(response.data);
        }else{
            //acciones si fue erroneo
            alert("Error");
        }
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