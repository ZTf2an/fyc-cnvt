import { apiPost } from '../../services/apiPetition';
import useGenerateParams from './useGenerateParams';

const generarCuenta = (target , editRow , setNewToast , handleClose) => {

    const check = validarRequisitos( target.modalidad , target.remitenteCuenta , target.modoCTA);

    if (check) {
        const response = confirm(`Está seguro de que desea generar la cuenta de cobro para ${target.cliente}?`);
        if ( response ) {
            editRow(target.id , {docsCuenta : 'load'} , 'none' , false );
            handleClose();

            const body = useGenerateParams(target);
            
            const onSuccesHandler = data => {
                const parsedData = JSON.parse(data);
                editRow(target.id , {docsCuenta : parsedData.url} , 'none' , false );
                setNewToast(parsedData)
            };

            const onErrorHandler = error => {
                setNewToast({status : 'error' , msj : error})
            };

            apiPost(
                {type : 'updateDocs' , docType : 'CUENTA'},
                {id : target.id , data : target , notes : body},
                onSuccesHandler , onErrorHandler
            );   
        };
    } else {
        handleClose();
    };
};

const validarRequisitos = ( modalidad , remitente , modo) => {
    if (!modalidad) {
        alert('No ha indicado modalidad');
        // handleClose();
        return false
    } else if (remitente != "diana" && remitente != 'boren' && remitente != 'daniel') {
        alert('No ha indicado el remitente (a nombre de quién irá la cuenta de cobro)');
        // handleClose();
        return false
    } else if (!modo || modo == 'selecciona') {
        alert('Debe indicar el porcentaje sobre el cual se enviará la cuenta de cobro');
        // handleClose();
        return false
    } else {
        return true
    } 
};

export default generarCuenta;