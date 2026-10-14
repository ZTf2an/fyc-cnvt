
export function formatedDate ( date ) {
    const preFecha = new Date(date);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());
    
    const unformatedMonth = fecha.getMonth()+1 
    const month = unformatedMonth.toString().length != 2 ? "0"+unformatedMonth : unformatedMonth;
    const day = fecha.getDate().toString().length != 2 ? "0"+fecha.getDate() : fecha.getDate();
    return `${fecha.getFullYear()}-${month}-${day}`;
}


/**
 * Calcula la diferencia de tiempo entre una fecha dada y el momento actual.
 * 
 * @param {string | Date} fechaInput - La fecha a evaluar (puede ser un string de fecha o un objeto Date).
 * @returns {string} Un texto descriptivo con el tiempo transcurrido.
 */
export function getRelativeTime(fechaInput , type = {format:'long'}) {
  const fecha = new Date(fechaInput);
  const ahora = new Date();
//   let text = '';
//   let dim

//   if(type.format === 'long') text += 'Hace';
  
  // Diferencia en segundos entre ambas fechas
  const segundos = Math.floor((ahora - fecha) / 1000);

  if (segundos < 60) {
    return "Hace unos segundos";
  }

  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) {
    return `Hace ${minutos} minuto${minutos === 1 ? '' : 's'}`;
  }

  const horas = Math.floor(minutos / 60);
  if (horas < 24) {
    return `Hace ${horas} hora${horas === 1 ? '' : 's'}`;
  }

  const dias = Math.floor(horas / 24);
  if (dias < 30) {
    return `Hace ${dias} día${dias === 1 ? '' : 's'}`;
  }

  const meses = Math.floor(dias / 30);
  if (meses < 12) {
    return `Hace ${meses} mes${meses === 1 ? '' : 'es'}`;
  }

  const anios = Math.floor(dias / 365);
  return `Hace ${anios} año${anios === 1 ? '' : 's'}`;
}