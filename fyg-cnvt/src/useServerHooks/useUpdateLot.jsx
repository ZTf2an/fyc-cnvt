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
        valorP : parseInt(params.inputValor) + parseInt(params.inputValorAcoVirtual) ,
        valorPC : parseInt(params.inputValor) + parseInt(params.inputValorControles) ,
        valorV : params.inputValor ,
        valorM : parseInt(params.inputValor) + parseInt(params.inputValorAcoMixta) ,
        valorAcomVirtual : params.inputValorAcoVirtual ,
        valorAcomMixta : params.inputValorAcoMixta ,
        valorAdicPresencial : params.inputValorAcoPresencial ,
        valorControles : params.inputValorControles ,
        descuento : params.inputDescuento ,
        incremento : params.inputIncremento , 
        servicios : JSON.stringify(servicesJson)
    }
}

export default objectParams