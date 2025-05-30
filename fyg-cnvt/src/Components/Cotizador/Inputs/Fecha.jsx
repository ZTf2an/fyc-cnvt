import { useState } from "react";

function Fecha ({value}) {
    const [fecha , setFecha] = useState();
    let stringFecha = "";
    if (value) {
        const preFecha = new Date(value);
        const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

        const unformatedMonth = fecha.getMonth()+1 
        const month = unformatedMonth.toString().length != 2 ? "0"+unformatedMonth : unformatedMonth;
        const day = fecha.getDate().toString().length != 2 ? "0"+fecha.getDate() : fecha.getDate();
        stringFecha = `${fecha.getFullYear()}-${month}-${day}`;
    }

    return (
        <div className="col-md-3">
            <label htmlFor="inputFecha" className="form-label">Fecha</label>
            <input type="date" className="form-control" id="inputFecha" name="inputFecha" defaultValue={stringFecha} />
            <div className="invalid-feedback">
            Pon la fecha del evento, o una aproximada!
            </div>
        </div>
    )
}

export default Fecha