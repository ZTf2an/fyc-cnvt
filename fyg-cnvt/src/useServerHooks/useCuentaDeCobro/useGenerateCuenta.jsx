import { API_CNVT, API_GAS } from '../../Globals/API';
import useGenerateParams from './useGenerateParams';

const generarCuenta = (target , editRow , handleClose) => {
    // const {editRow} = useContext(RegistroContext);
    const check = validarRequisitos( target.modalidad , target.remitenteCuenta , target.modoCTA)
    if (check) {
        const response = confirm(`Está seguro de que desea generar la cuenta de cobro para ${target.cliente}?`);
        if ( response ) {
            editRow(target.id , {docsCuenta : 'load'} , 'none' , false );
            handleClose();
            // console.log(useGenerateParams(target))
            const body = useGenerateParams(target);

            fetch(`${API_CNVT}/globals` , {
                method : 'POST',
                headers : {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    url :`${API_GAS}?type=updateDocs&docType=CUENTA`, 
                    body : {id : target.id , data : target , notes : body}
                })    
            })
            .then(response => response.json())
            .then(data => {
                const parsedData = JSON.parse(data);
                // console.log(data.url);
                editRow(target.id , {docsCuenta : parsedData.url} , 'none' , false );
            })
            .catch(e => alert('error'))
            
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
    } else if (remitente != "julian" && remitente != 'steffan') {
        alert('No ha indicado el remitente (a nombre de quién irá la cuenta de cobro)');
        // alert(target.remitenteCuenta != "julian"  target.remitenteCuenta != 'steffan');
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