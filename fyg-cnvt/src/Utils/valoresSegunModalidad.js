const valoresSegunModalidad = (row) => {
    let adicionalPorHorasExtra = 0;
    const pricesMatrix = {
        "P-tarjetas" : row.valorP ,
        "P-Controles" : row.valorPC ,
        "Virtual" : row.valorV ,
        "Mixta" : row.valorM ,
    }

    if ( row.duracion ) {
        let horasExtra = parseInt(row.duracion) - 5;
        if (horasExtra > 0) {
            adicionalPorHorasExtra = horasExtra * 100000;
        };
    };
    return parseInt(pricesMatrix[row.modalidad]) + adicionalPorHorasExtra;
};

export default valoresSegunModalidad;