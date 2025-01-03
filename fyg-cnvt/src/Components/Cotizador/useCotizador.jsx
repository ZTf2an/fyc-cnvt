import { useContext, useEffect, useState } from "react"
import { calcularValor } from "../../Utils/calcularValor";


export const useCotizador = () => {

    // Descuento e incremento
    const [descuentoIsChecked , setDescuentoIsChecked] = useState(false);
    const [incrementoIsChecked , setIncrementoIsChecked ] = useState(false);

    //Valor por defecto.
    const [defaultValor , setDefaultValor] = useState(0);
    const [numeroPredios , setNumeroPredios] = useState(0);
    const [descuentoCoef , setDescuentoCoef] = useState(0);
    const [incrementoCoef , setIncrementoCoef] = useState(0);

    // Incremento y Descuento alternables
    useEffect(()=>{
        if (descuentoIsChecked) {
            setIncrementoIsChecked(false);
            setDescuentoCoef(10);
            setIncrementoCoef(0);            
        } else {
            setDescuentoCoef(0);
        }
        if (incrementoIsChecked) {
            setDescuentoCoef(0);
            setIncrementoCoef(10);
            setDescuentoIsChecked(false)
        } else {
            setIncrementoCoef(0)
        }
        setDefaultValor(calcularValor(numeroPredios , descuentoCoef , incrementoCoef))
    },[numeroPredios , descuentoCoef , incrementoCoef , descuentoIsChecked , incrementoIsChecked])

    return(
        {
            descuentoIsChecked , setDescuentoIsChecked ,
            incrementoIsChecked , setIncrementoIsChecked ,
            defaultValor , setDefaultValor ,
            numeroPredios , setNumeroPredios ,
            incrementoCoef , setIncrementoCoef ,
            descuentoCoef , setDescuentoCoef
        }
    )
}