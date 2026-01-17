import { useEffect } from "react";
import {useCotizador } from "./useCotizador";
import {postData , parsedParams} from '../../useServerHooks/useCreate';
import objectParams from "../../useServerHooks/useUpdateLot";
import Cliente from "./Inputs/Cliente";
import Fecha from "./Inputs/Fecha";
import Tel from "./Inputs/Tel";
import Modalidades from "./Inputs/Modalidades";
import PrediosValor from "./Inputs/PrediosValor";
import ValoresAdicionales from "./Inputs/ValoresAdicionales";
import ServiciosAdicionales from "./Inputs/ServiciosAdicionales";
// import Email from "./Inputs/Email"; Se Ignora por el nuevo orden que se le dió.
// import DescInc from "./Inputs/DescInc";


function Cotizador ({object , formName , edit , modalIsOpen , disableButton , sendMail , changes}) {
    const context = useCotizador();
    // console.log(context.serviciosAdicionales)

    
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
        let params = parsedParams(e.target);
        params["sendMail"] = sendMail;
        const data = JSON.stringify(params);
        
        if(!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            disableButton(true);
            // console.log(params);
            postData(params, () => {
                window.location.reload();
                e.target.reset();
            })
        }
        e.target.classList.add('was-validated')
    };
    
    const editarRegistro = (e) => {
        let params = objectParams(parsedParams(e.target));
        // console.log(params);
        edit(object.id , params , 'lote');
        modalIsOpen(false);
        e.target.reset();
    };
    
    useEffect(()=> {
        context.setChanges(changes)
        context.setDescuentoIsChecked(Boolean(object?.descuento));
        context.setDescuentoCoef(object?.descuento || 0);
        context.setNumeroPredios(object?.predios);
        context.setDefaultValorVirtual(object?.valorV);
        context.setDefaultValorTarjetas(object?.valorP);
        context.setDefaultValorControles(object?.valorPC);
        context.setDefaultValorQR(object?.valorPQR);
        context.setDefaultValorMixta(object?.valorM);
    },[object]);
    
    return(
        <form 
            className="row g-3 needs-validation" 
            id={formName} 
            noValidate
            onSubmit={mySubmit}
        >
            <Cliente 
                value={object?.cliente}
                conjunto={object?.cliente}
                nit={object?.nit}
                direccion={object?.direccion}
                titular={object?.titular}
                email={object?.email}
            />
            <Fecha fechaObj={object?.fecha} horaObj={object?.hora} />
            <Tel value={object?.tel}/>
            <Modalidades 
                valueV={object?.modalidadV}
                valueM={object?.modalidadM}
                valueP={object?.modalidadP}
                valuePC={object?.modalidadPC}
            />
            <PrediosValor 
                prediosChange={context.setNumeroPredios}
                defaultValorVirtual={context.defaultValorVirtual}
                defaultValorTarjetas={context.defaultValorTarjetas}
                defaultValorControles={context.defaultValorControles}
                defaultValorQR={context.defaultValorQR}
                defaultValorMixta={context.defaultValorMixta}
                changeDefaultValorVirtual={context.setDefaultValorVirtual}
                changeDefaultValorTarjetas={context.setDefaultValorTarjetas}
                changeDefaultValorControles={context.setDefaultValorControles}
                changeDefaultValorQR={context.setDefaultValorQR}
                changeDefaultValorMixta={context.setDefaultValorMixta}
                descuentoIsChecked={context.descuentoIsChecked}
                incrementoIsChecked={context.incrementoIsChecked}
                setDescuentoIsChecked={context.setDescuentoIsChecked}
                setIncrementoIsChecked={context.setIncrementoIsChecked}
                setDescuentoCoef={context.setDescuentoCoef}
                descuentoCoef={context.descuentoCoef}
                setIncrementoCoef={context.setIncrementoCoef}
                incrementoCoef={context.incrementoCoef}
                prediosDefault={context.numeroPredios}
            />
            <ValoresAdicionales 
                value = { context.valoresAdicionales }
                setValue = {context.setValoresAdicionales}
            />
            <ServiciosAdicionales value={context.serviciosAdicionales} setValue={context.setServiciosAdicionales}/>
        </form> 
    )
}



export default Cotizador