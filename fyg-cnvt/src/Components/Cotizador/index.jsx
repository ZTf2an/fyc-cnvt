import {useCotizador } from "./useCotizador";
import {Modal} from 'bootstrap'
import {postData , parsedParams} from '../../useServerHooks/useCreate'
import Cliente from "./Inputs/Cliente";
import Email from "./Inputs/Email";
import Fecha from "./Inputs/Fecha";
import Tel from "./Inputs/Tel";
import Modalidades from "./Inputs/Modalidades";
import PrediosValor from "./Inputs/PrediosValor";
import DescInc from "./Inputs/DescInc";
import ValoresAdicionales from "./Inputs/ValoresAdicionales";
import ServiciosAdicionales from "./Inputs/ServiciosAdicionales";
import { useEffect } from "react";


function Cotizador ({object , formName}) {
    const context = useCotizador();

    useEffect(()=> {
        context.setDescuentoIsChecked(Boolean(object?.descuento));
        context.setDescuentoCoef(object?.descuento || 0);
        context.setDefaultValor(object?.valorP || 0);
        context.setNumeroPredios(object?.predios)
    },[object])

    const mySubmit = (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case "crearRegistro" :
                crearRegistro(e);
                break;
            case "editarRegistro" :
                editarRegistro();
                break;
        };
    };

    const crearRegistro = (e) => {
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
    };

    const editarRegistro = () => {
        console.log('editando Registro')        
    };
    
    return(
            <form 
                className="row g-3 needs-validation" 
                id={formName} 
                noValidate
                onSubmit={mySubmit}
            >
                <Cliente value={object?.cliente}/>
                <Fecha value={object?.fecha}/>
                <Email value={object?.email}/>
                <Tel value={object?.tel}/>
                <Modalidades 
                    valueV={object?.modalidadV}
                    valueM={object?.modalidadM}
                    valueP={object?.modalidadP}
                    valuePC={object?.modalidadPC}
                />
                <PrediosValor 
                    prediosChange={context.setNumeroPredios}
                    defaultValor={context.defaultValor}
                    changeDefaultValor={context.setDefaultValor}
                    prediosDefault={context.numeroPredios}
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
                <ValoresAdicionales value={
                    [object?.valorAcomVirtual ,
                    object?.valorAcomMixta ,
                    object?.valorAdicPresencial ,
                    object?.valorControles]
                    }/>
                <ServiciosAdicionales />
                    
            </form> 
    )
}



export default Cotizador