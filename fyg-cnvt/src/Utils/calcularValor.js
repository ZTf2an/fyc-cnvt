export function calcularValor( defaultValor , extra , descuento , incremento ) {
    // let valorTotal = valorSegunPredios(numeroPredios);
    let valorTotal = parseInt(defaultValor) + parseInt(sumarArray(extra));
    valorTotal -= (valorTotal/100)*descuento;
    valorTotal += (valorTotal/100)*incremento;
    valorTotal += (valorTotal*0.05);//este ultimo Sumando, corresponde al incremento realizado en el año 2016 del 5%
    
    return valorTotal
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
    valorCabinas = (cabinas - 2) * 150000;
  };
  if (videoBeam > 1 ) {
    valorVideoBeam = (videoBeam-1) * 180000;
  };
  if (camara > 1 ) {
    valorCamara = (camara-1) * 250000;
  };
  if (logisticos > calcularLogisticos(predios)) {
    valorLogisticos = (logisticos - calcularLogisticos(predios)) * 100000;
  };

  return valorCabinas + valorVideoBeam + valorCamara + valorLogisticos;
}

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

  export function extraerVAlorPreSegunPredios(numeroPredios) {
    let total;
    if (numeroPredios == 0) {
      total = 0;
    } else if (numeroPredios < 100) {
      total = (numeroPredios - 50)*8000 + 854280 + 459000;
    } else if (numeroPredios < 150) {
      total = (numeroPredios - 100)*8000 + 1305828 + 561000;
    } else if (numeroPredios < 200) {
      total = (numeroPredios - 150)*7500 + 1629234 + 663000;
    } else if (numeroPredios < 250) {
      total = (numeroPredios - 200)*6800 + 1952640 + 765000;
    } else if (numeroPredios < 300) {
      total = (numeroPredios - 250)*6800 + 2154006 + 867000;
    } else if (numeroPredios < 350) {
      total = (numeroPredios - 300)*5500 + 2355372 + 969000;
    } else if (numeroPredios < 400) {
      total = (numeroPredios - 350)*5200 + 2556738 + 969000;
    } else if (numeroPredios < 450) {
      total = (numeroPredios - 400)*4200 + 2758104+ 969000;
    } else if (numeroPredios < 500) {
      total = (numeroPredios - 450)*4200 + 2959470 + 969000;
    } else if (numeroPredios < 550) {
      total = (numeroPredios - 500)*4200 + 3160836 + 969000;
    } else if (numeroPredios < 600) {
      total = (numeroPredios - 550)*4200 + 3374406 + 969000;
    } else if (numeroPredios < 650) {
      total = (numeroPredios - 600)*4200 + 3587976 + 969000;
    } else if (numeroPredios < 700) {
      total = (numeroPredios - 650)*4200 + 3789342 + 969000;
    } else if (numeroPredios < 750) {
      total = (numeroPredios - 700)*4000 + 3990708 + 969000;
    } else if (numeroPredios < 800) {
      total = (numeroPredios - 750)*4000 + 4192074 + 969000;
    } else if (numeroPredios < 850) {
      total = (numeroPredios - 800)*4000 + 4393440 + 969000;
    } else if (numeroPredios < 900) {
      total = (numeroPredios - 850)*4000 + 4607010 + 969000;
    } else if (numeroPredios < 950) {
      total = (numeroPredios - 900)*4000 + 4820580 + 969000;
    } else if (numeroPredios < 1000) {
      total = (numeroPredios - 950)*4000 + 5021946 + 969000;
    } else if (numeroPredios < 1050) {
      total = (numeroPredios - 1000)*4000 + 5223312 + 969000;
    } else {
      total = (numeroPredios - 1050)*4000 + 5445792 + 969000;
    } 

    return total;
  }

  export function extraerValorVirSegunPredios(numeroPredios) {
    let total;
    if (numeroPredios == 0) {
      total = 0;
    } else if (numeroPredios <= 50) {
      total = 950000;
    } else if (numeroPredios < 100) {
      total = (numeroPredios - 50)*3500 + 950000 ;
    } else if (numeroPredios < 150) {
      total = (numeroPredios-100)*8000 + 1305828;
    } else if (numeroPredios < 200) {
      total = (numeroPredios - 150)*7500 + 1629234;
    } else if (numeroPredios < 250) {
      total = (numeroPredios - 200)*6800 + 1952640;
    } else if (numeroPredios < 300) {
      total = (numeroPredios - 250)*6800 + 2154006;
    } else if (numeroPredios < 350) {
      total = (numeroPredios - 300)*5500 + 2355372;
    } else if (numeroPredios < 400) {
      total = (numeroPredios - 350)*5200 + 2556738;
    } else if (numeroPredios < 450) {
      total = (numeroPredios - 400)*4200 + 2758104;
    } else if (numeroPredios < 500) {
      total = (numeroPredios - 450)*4200 + 2959470;
    } else if (numeroPredios < 550) {
      total = (numeroPredios - 500)*4200 + 3160836;
    } else if (numeroPredios < 600) {
      total = (numeroPredios - 550)*4200 + 3374406;
    } else if (numeroPredios < 650) {
      total = (numeroPredios - 600)*4200 + 3587976;
    } else if (numeroPredios < 700) {
      total = (numeroPredios - 650)*4200 + 3789342;
    } else if (numeroPredios < 750) {
      total = (numeroPredios - 700)*4000 + 3990708;
    } else if (numeroPredios < 800) {
      total = (numeroPredios - 750)*4000 + 4192074;
    } else if (numeroPredios < 850) {
      total = (numeroPredios - 800)*4000 + 4393440;
    } else if (numeroPredios < 900) {
      total = (numeroPredios - 850)*4000 + 4607010;
    } else if (numeroPredios < 950) {
      total = (numeroPredios - 900)*4000 + 4820580;
    } else if (numeroPredios < 1000) {
      total = (numeroPredios - 950)*4000 + 5021946;
    } else if (numeroPredios < 1050) {
      total = (numeroPredios - 1000)*4000 + 5223312;
    } else {
      total = (numeroPredios - 1050)*4000 + 5445792;
    } 

    return total;
  }

  export function extraerValorPCRSegunPredios(presencial, numeroControles) {
    let total;
    if( numeroControles <= 100 ) {
      total = numeroControles*9000
    } else if ( numeroControles <= 200 ) {
      total = numeroControles*8500
    } else if (numeroControles <= 300) {
      total = numeroControles*8000
    } else if (numeroControles <= 400) {
      total = numeroControles*7500
    } else {
      total = numeroControles*7000
    }

    return total + presencial
  }

  export function extraerValorMSegunPredios(presencial, numeroPredios) {
    let zoom;
    if (numeroPredios < 101) {
      zoom = 300000 + (600*numeroPredios)
    } else if (numeroPredios < 501) {
      zoom = 550000 + (600*numeroPredios)
    } else {
      zoom = 800000 + (600*numeroPredios)
    }
    return presencial + zoom
  }

  export function extraerValorQRSegunPredios(predios , valorPresencial) {
    return (parseInt(predios)*1000) + 200000 + valorPresencial;
  };

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

