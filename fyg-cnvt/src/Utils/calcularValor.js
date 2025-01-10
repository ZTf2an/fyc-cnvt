export function calcularValor( numeroPredios , descuento , incremento ) {
    let valorTotal = valorSegunPredios(numeroPredios);
    valorTotal -= (valorTotal/100)*descuento;
    valorTotal += (valorTotal/100)*incremento;
    
    return valorTotal;
  }

function valorSegunPredios(numeroPredios){
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

  function valorVariosPredios( numero ){
    
  }