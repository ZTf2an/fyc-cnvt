import { createContext, useEffect, useState } from "react"
import { calcularValor } from "../../Utils/calcularValor";

export const CotizadorContext = createContext()

export const CotizadorProvider = ({children}) => {
    // Estados Referentes a Modalidad - debe reconocer que hay almenos una modalidad seleccionada
    const DefaultModes = {
        v : false,
        pt : false,
        pc : false,
        m : false
    }
    const [modesSelected, setModesSelected] = useState(DefaultModes);
    useEffect(()=>{
        if (!modesSelected.m && !modesSelected.pc && !modesSelected.pt && !modesSelected.v) {
            setOneMinimalModeSelected(false)
        } else {
            setOneMinimalModeSelected(true)
        }
        
    },[modesSelected]);
    const [oneMinimalModeSelected , setOneMinimalModeSelected] = useState(true);

    // Descuento e incremento
    const [descuentoIsChecked , setDescuentoIsChecked] = useState(false);
    const [incrementoIsChecked , setIncrementoIsChecked ] = useState(false);

    //Valor por defecto.
    const [defaultValor , setDefaultValor] = useState(0);
    const [numeroPredios , setNumeroPredios] = useState(0);
    const [descuentoCoef , setDescuentoCoef] = useState(0);
    const [incrementoCoef , setIncrementoCoef] = useState(0);
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
        <CotizadorContext.Provider value={{
            modesSelected , setModesSelected,
            oneMinimalModeSelected , setOneMinimalModeSelected ,
            descuentoIsChecked , setDescuentoIsChecked ,
            incrementoIsChecked , setIncrementoIsChecked ,
            defaultValor , setDefaultValor ,
            numeroPredios , setNumeroPredios ,
            incrementoCoef , setIncrementoCoef ,
            descuentoCoef , setDescuentoCoef
        }}>
            {children}
        </CotizadorContext.Provider>
    )
}