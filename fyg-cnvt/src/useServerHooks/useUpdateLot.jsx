const objectParams = (params) => {
    const servicesJson = { 
        acta : {isRequired : params.inputSerActa=='on'} , 
        filmacion : {isRequired : params.inputSerFilmacion=='on' , camaras : params.inputSerCamaras} , 
        votacion : { isRequired : params.inputSerVotacion=='on' , logisticos : params.inputSerLogisticos},
        sonido : {isRequired : params.inputSerSonido=='on' , cabinas : params.inputSerCabinas , microfonos : params.inputSerMicrofonos , patinadores : params.inputSerPatinadores} ,
        proyeccion : {isRequired : params.inputSerVideoBeam1=='on' , videobeam : params.inputSerVideoBeam , telon : params.inputSerTelon} ,
        cctv : {isRequired : params.inputSerCircuitoCerrado=='on' , salones : params.inputSerSalones} 
      };
    console.log(params)

    return { cliente : params.inputNombreCliente ,
        fecha : params.inputFecha , 
        hora : params.inputHora , 
        predios : params.inputPredios ,
        email : params.inputCorreo ,
        tel : params.inputNumeroTelefonico ,
        titular : params.inputTitular ,
        direccion : params.inputDireccion ,
        nit : params.inputNit ,
        modalidadP : params.flexCheckMPresencialT=='on' ,
        modalidadPC : params.flexCheckMPresencialC=='on' ,
        modalidadV : params.flexCheckMVirtual=='on' ,
        modalidadM : params.flexCheckMMixta=='on' ,
        modalidadQR : params.flexCheckMPresencialQR == 'on' ,
        valorP : params.inputValorPT,
        valorPC : params.inputValorPCR,
        valorV : params.inputValorVir,
        valorPQR : params.inputValorPQR ,
        valorM : params.inputValorM,
        valorAcomVirtual : params.inputValorAcoVirtual ,
        valorAcomMixta : params.inputValorAcoMixta ,
        valorAdicPresencial : params.inputValorAcoPresencial ,
        valorControles : params.inputValorControles ,
        descuento : params.inputDescuento ,
        incremento : params.inputIncremento , 
        servicios : JSON.stringify(servicesJson) ,
        numeroControles : params.inputNumeroControles ,
        notas : params.inputNotas ,
        referido : params.inputReferido,
        valorVA : params.inputValorPSE,
        valorSE : params.inputValorVirAc ,
        modalidadVA : params.flexCheckMVirtualA == "on",
        modalidadSE : params.flexCheckMPresencialSE == "on",
    }
}

export default objectParams