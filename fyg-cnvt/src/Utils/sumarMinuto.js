export function sumarMinuto ( fecha ) {
    const fechaObj = new Date(fecha);
    fechaObj.setMinutes(fechaObj.getMinutes() + 1);

    return fechaObj.toISOString().split('T')[0];
}