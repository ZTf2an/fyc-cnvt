import numbers2words from 'numbers2words';

function useGenerateParams (item) {
    const valor = valoresSegunModalidad(item);
    const translator = new numbers2words("ES_ES");
    // console.log(translator.toWords(valor));
    const concepto = getConcepto(item);
    
    return { valorNumerico : valor , valorEnLetra : translator.toWords(valor) , concepto : concepto}
    
};

const valoresSegunModalidad = (row) => {
    let adicionalPorHorasExtra = 0;
    const pricesMatrix = {
        "P-tarjetas" : row.valorP ,
        "P-Controles" : row.valorPC ,
        "Virtual" : row.valorV ,
        "Mixta" : row.valorM ,
    }

    let valor = 0;

    if ( row.duracion ) {
        let horasExtra = parseInt(row.duracion) - 6;
        if (horasExtra > 0) {
            adicionalPorHorasExtra = horasExtra * 100000;
        };
    };
    
    valor = obtenerPorcentaje(pricesMatrix[row.modalidad] , row.modoCTA);

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
    if (item.modoCTA == '50') {
        if (toDate < date) {
            concepto += "anticipo 50% por los servicios a realizar ";
        } else {
            concepto += "saldo 50% por los servicios realizados ";
        };
    } else {
        if (toDate < date) {
            concepto += "servicios a realizar ";
        } else {
            concepto += "servicios realizados ";
        }
    };
    concepto += "de logistica de Asamblea 2025";

    return concepto;
};

export default useGenerateParams;