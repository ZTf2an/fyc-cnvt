import { useEffect } from "react";
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
import { API_CNVT } from "../../Globals/API";


function Cotizador ({object , formName , edit}) {
    const context = useCotizador();

    const objectParams = (params) => {
        const servicesJson = { 
            acta : {isRequired : params.inputSerActa=='on'} , 
            filmacion : {isRequired : params.inputSerFilmacion=='on'} , 
            votacion : { isRequired : params.inputSerVotacion=='on' , logisticos : params.inputSerLogisticos},
            sonido : {isRequired : params.inputSerSonido=='on' , cabinas : params.inputSerCabinas , microfonos : params.inputSerMicrofonos , patinadores : params.inputSerPatinadores} ,
            proyeccion : {isRequired : params.inputSerVideoBeam1=='on' , videobeam : params.inputSerVideoBeam , telon : params.inputSerTelon} ,
            cctv : {isRequired : params.inputSerCircuitoCerrado=='on' , salones : params.inputSerSalones} 
          };

        return { cliente : params.inputNombreCliente ,
            fecha : params.inputFecha , 
            predios : params.inputPredios ,
            email : params.inputCorreo ,
            tel : params.inputNumeroTelefonico ,
            modalidadP : params.flexCheckMPresencialT=='on' ,
            modalidadPC : params.flexCheckMPresencialC=='on' ,
            modalidadV : params.flexCheckMVirtual=='on' ,
            modalidadM : params.flexCheckMMixta=='on' ,
            valorP : params.inputValor ,
            valorPC : params.inputValor ,
            valorV : params.inputValor ,
            valorM : params.inputValor ,
            valorAcomVirtual : params.inputValorAcoVirtual ,
            valorAcomMixta : params.inputValorAcoMixta ,
            valorAdicPresencial : params.inputValorAcoPresencial ,
            valorControles : params.inputValorControles ,
            descuento : params.inputDescuento ,
            incremento : params.inputIncremento , 
            servicios : JSON.stringify(servicesJson)
        }
    }

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
                editarRegistro(e);
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

    const editarRegistro = (e) => {
        let params = objectParams(parsedParams(e.target));
        // console.log(params);
        edit(object.id , params , 'lote')

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