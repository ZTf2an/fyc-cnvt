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
      total = 750000;
    } else if (numeroPredios <= 75) {
      total = 850000;
    } else if (numeroPredios <= 100) {
      total = 1050000;
    } else if (numeroPredios <= 125) {
      total = 1250000;
    } else if (numeroPredios <= 150) {
      total = 1375000;
    } else if (numeroPredios <= 175) {
      total = 1495000;
    } else if (numeroPredios <= 200) {
      total = 1650000;
    } else if (numeroPredios <= 225) {
      total = 1800000;
    } else if (numeroPredios <= 250) {
      total = 1950000;
    } else {
      total = ((numeroPredios - 250)*3500) + 1950000;
    }
    return total;
  }