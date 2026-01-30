import numbers2words from 'numbers2words';

function useGenerateParams (item) {
    const valor = valoresSegunModalidad(item);
    const translator = new numbers2words("ES_ES");
    // console.log(translator.toWords(valor));
    const concepto = getConcepto(item);
    
    return { valorNumerico : valor , valorEnLetra : translator.toWords(parseInt(valor)) , concepto : concepto}
    
};

const valoresSegunModalidad = (row) => {
    let adicionalPorHorasExtra = 0;
    const pricesMatrix = {
        "P-Controles" : {valor :row.valorPC , horaExtra : 150000} ,
        "Mixta" : {valor :row.valorM , horaExtra : 150000},
        "P-tarjetas" : {valor :row.valorP , horaExtra : 130000} ,
        "P-QRcode" : {valor :row.valorPQR , horaExtra : 130000} ,
        "Virtual" : {valor :row.valorV , horaExtra : 100000} 
    }

    let valor = 0;

    if ( row.duracion ) {
        let horasExtra = parseInt(row.duracion) - 6;
        if (horasExtra > 0) {
            adicionalPorHorasExtra = horasExtra * pricesMatrix[row.modalidad].horaExtra;
        };
    };
    
    console.log('Adicional por horas '+adicionalPorHorasExtra)
    valor = obtenerPorcentaje(pricesMatrix[row.modalidad].valor , row.modoCTA);

    return valor + adicionalPorHorasExtra;
};

const obtenerPorcentaje = (valorString , porcentajeString) => {
    const coef = parseInt(porcentajeString) / 100;
    return parseInt(valorString) * coef
};

const getConcepto = (item) => {
    let concepto = "Por concepto de ";
    // const coef = 100 / parseInt(item.modoCTA);
    const toDate = new Date();
    const date = new Date(item.fecha);
    if (item.modoCTA !== '100') {
        if (toDate < date) {
            concepto += `anticipo ${item.modoCTA}% por los servicios a realizar `;
        } else {
            concepto += `saldo ${item.modoCTA}% por los servicios realizados `;
        };
    } else {
        if (toDate < date) {
            concepto += "servicios a realizar ";
        } else {
            concepto += "servicios realizados ";
        }
    };
    concepto += "de logística de Asamblea 2026";

    return concepto;
};

export default useGenerateParams;