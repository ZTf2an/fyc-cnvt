function mostrarValor(modalidad,checkBox,array) {
    let valor;
    let valores = array.split(",");
    switch(modalidad) {
        case "Virtual":
          if (checkBox==true) {
            valor = parseInt(valores[0])+parseInt(valores[1]);
          }else {
            valor = parseInt(valores[0]);
          }
        break;
        case "Presencial":
          valor = parseInt(valores[0]) + parseInt(valores[2]);
        break;
        case "Mixta":
          valor= parseInt(valores[0]) + parseInt(valores[3]);
        break;
        case "" :
          valor=0;
        break; 
      }
    return valor;
  }