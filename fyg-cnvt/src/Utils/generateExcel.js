import * as XLSX from "xlsx";
import formatedDate from "./formatDate";
import formatHour from "./formatHour";

// Este es el formato sugerido por Diana Prianeque
const pixelFormat = ( obj ) => {
    const newObj = {
        ID : obj.cliente ,
        FECHA : formatedDate(obj.fecha) ,
        HORA : formatHour(obj.hora) ,
        CONJUNTO : obj.cliente ,
        NIT : obj.nit ,
        MODALIDAD : obj.modalidad ,
        PREDIOS : obj.predios ,
        EMAIL : obj.email,
        TEL : obj.tel ,
        Dirección : obj.direccion ,
        OBSERVACIÓN : obj.notas
    };
    return newObj
};

export default function generarExcel(arr) {
    const newARR= arr.map(obj => pixelFormat(obj));
    // console.log(newARR)

    const ws = XLSX.utils.json_to_sheet(newARR);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
    XLSX.writeFile(wb, "ejemplo.xlsx");
}
