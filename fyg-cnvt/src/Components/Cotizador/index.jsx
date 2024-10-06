import {useCotizador } from "./useCotizador";
import { API_CNVT } from "../../Globals/API";
import {Modal} from 'bootstrap'
import Cliente from "./Inputs/Cliente";
import Email from "./Inputs/Email";
import Fecha from "./Inputs/Fecha";
import Tel from "./Inputs/Tel";
import Modalidades from "./Inputs/Modalidades";
import PrediosValor from "./Inputs/PrediosValor";
import DescInc from "./Inputs/DescInc";
import ValoresAdicionales from "./Inputs/ValoresAdicionales";
import ServiciosAdicionales from "./Inputs/ServiciosAdicionales";


function Cotizador () {
    const context = useCotizador();

    const mySubmit = (e) => {
        e.preventDefault();

        let params = parsedParams(e.target)
        const data = JSON.stringify(params);
        
        if(!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            postData(data, () => {
                e.target.reset();
                const modal = Modal.getInstance('#registroModal');
                modal.hide();
            })
        }
        e.target.classList.add('was-validated')
    }

    const parsedParams = (arr) => {
        let params = {};

        for (let i = 0 ; i < arr.length ; i++) {
            if (arr[i].name != "") {
                params[arr[i].name] = arr[i].value;
            }; 
        };

        return params
    }
    
    const postData = (data , cb) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", API_CNVT,true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json')
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log(this.responseText);
                grabaOK(response);
                cb();
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
            alert(response.msj);
            // myModal.hide()
        }else{
            //acciones si fue erroneo
            alert("Error");
            return false
        }
    }

    return(
            <form 
                className="row g-3 needs-validation" 
                id="crearRegistro" 
                noValidate
                onSubmit={mySubmit}
            >
                <Cliente/>
                <Fecha/>
                <Email/>
                <Tel />
                <Modalidades/> 
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