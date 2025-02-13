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

    //Controles.
    const [valorControles , setValorControles] = useState(5);
    
    //Cambios 
    const [changes , setChanges] = useState(true)

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
        if (changes){
            setDefaultValor(calcularValor(numeroPredios , descuentoCoef , incrementoCoef));
        }; 
        setValorControles(calcularValorControles(numeroPredios));
    },[numeroPredios , descuentoCoef , incrementoCoef , descuentoIsChecked , incrementoIsChecked ])

    const calcularValorControles = (ip) => {
        let controles;
        (isNaN(ip)) ? controles = 0 : controles = ip;
        // console.log(controles);
        return parseInt(controles)*8500
    };

    return(
        {
            descuentoIsChecked , setDescuentoIsChecked ,
            incrementoIsChecked , setIncrementoIsChecked ,
            defaultValor , setDefaultValor ,
            numeroPredios , setNumeroPredios ,
            incrementoCoef , setIncrementoCoef ,
            descuentoCoef , setDescuentoCoef ,
            valorControles , setValorControles ,
            changes , setChanges
        }
    )
}