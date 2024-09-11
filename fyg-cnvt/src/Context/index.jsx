import { createContext, useEffect, useState } from "react";
import { API_CNVT } from "../Globals/API";

export const RegistroContext = createContext();

export const RegistroProvider= ({children}) => {
    const [loading , setLoading] = useState(true);
    const [data , setdata] = useState([]);
    
    useEffect(()=>{
        fetch(API_CNVT)
        .then(response=> response.json())
        .then(data => setdata(data.reverse()))
        .catch(error => console.log('Ha ocurrido un error :'+error));
    },[]);

    useEffect(()=>{
        if ( data.length != 0) {
            setLoading(false)
        }
    },[data])


    const [modalRegistroIsOpen , setModalRegistroIsOpen ] = useState(false);

    // useEffect(() => {} , [])

    return (
        <RegistroContext.Provider value={{
            data, setdata,
            modalRegistroIsOpen , setModalRegistroIsOpen ,
            loading
        }}>
            {children}
        </RegistroContext.Provider>
    )
}