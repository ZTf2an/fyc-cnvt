export function calcularValor( defaultValor , extra , descuento , incremento ) {
    // let valorTotal = valorSegunPredios(numeroPredios);
    let valorTotal = parseInt(defaultValor) + parseInt(sumarArray(extra));
    valorTotal -= (valorTotal/100)*descuento;
    valorTotal += (valorTotal/100)*incremento;
    
    return valorTotal;
}

export function calcularEquiposAdicionales(cabinas , videoBeam , camara , logisticos , predios) {
  /*let cabinas = inputSerCabinas.value
  let videoBeam = inputSerVideoBeam2.value
  let camara = inputSerCamaras.value
  let logisticos = inputSerPatinadores2.value*/
  
  let valorCabinas = 0
  let valorVideoBeam = 0
  let valorCamara = 0
  let valorLogisticos = 0

  if ( cabinas > 2 ) {
    valorCabinas = (cabinas - 2) * 100000;
  };
  if (videoBeam > 1 ) {
    valorVideoBeam = (videoBeam-1) * 150000;
  };
  if (camara > 1 ) {
    valorCamara = (camara-1) * 180000;
  };
  if (logisticos > calcularLogisticos(predios)) {
    valorLogisticos = (logisticos - calcularLogisticos(predios)) * 100000;
  };

  return valorCabinas + valorVideoBeam + valorCamara + valorLogisticos;
}

  export function calcularValorControles (ip , valorPorControl) {
    const controles = isNaN(ip) ? 0 : ip;
    return parseInt(controles) * valorPorControl;
  };

export function valorSegunPredios(numeroPredios){
    let total;
    if (numeroPredios == 0) {
      total = 0

    } else if (numeroPredios <= 50) {
      total = 850000;
    } else if (numeroPredios <= 75) {
      total = 975000;
    } else if (numeroPredios <= 100) {
      total = 1250000;
    } else if (numeroPredios <= 125) {
      total = 1450000;
    } else if (numeroPredios <= 150) {
      total = 1575000;
    } else if (numeroPredios <= 175) {
      total = 1750000;
    } else if (numeroPredios <= 200) {
      total = 1950000;
    } else if (numeroPredios <= 225) {
      total = 2150000;
    } else if (numeroPredios <= 250) {
      total = 2300000;
    } else {
      total = ((numeroPredios - 250)*4000) + 2300000;
    }
    return total;
  }

  export function calcularLogisticos(numpre) {
    let numLogs = (numpre < 100) ? 2 : ~~(numpre / 100) + 1;
    // console.log(numLogs)
    return numLogs;
  };

  function sumarArray (array) {
    let total = 0;
    array.forEach(i => {
      total += parseInt(i);     
    });
    return total;
  };

