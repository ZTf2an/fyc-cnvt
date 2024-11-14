export default function formatedDate ( date ) {
    const preFecha = new Date(date);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());
    
    const unformatedMonth = fecha.getMonth()+1 
    const month = unformatedMonth.toString().length != 2 ? "0"+unformatedMonth : unformatedMonth;
    const day = fecha.getDate().toString().length != 2 ? "0"+fecha.getDate() : fecha.getDate();
    return `${fecha.getFullYear()}-${month}-${day}`;
}