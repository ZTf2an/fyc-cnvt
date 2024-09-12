import { createContext, useEffect, useState } from "react";
import { API_CNVT } from "../Globals/API";

export const RegistroContext = createContext();

export const RegistroProvider= ({children}) => {
    const [loading , setLoading] = useState(true);
    const [data , setData] = useState([]);
    
    useEffect(()=>{
        fetch(API_CNVT)
        .then(response=> response.json())
        .then(data => setData(data.reverse()))
        .catch(error => console.log('Ha ocurrido un error :'+error));
    },[]);

    useEffect(()=>{
        if ( data.length != 0) {
            setLoading(false)
        }
    },[data])

    const editType = {
        "aceptar" : (nombreCliente) => (`¿Está seguro de que quiere enviar a ${nombreCliente} a la pagina de Cobranza?`),
        "rechazar" : (nombreCliente) => (`¿Está seguro de que quiere eliminar a ${nombreCliente} de la pagina de cobranza?`),
        "eliminar" : (nombreCliente) => (`¿Está seguro de que quiere eliminar a ${nombreCliente}`),
    }
    
    const editRow = (id , changes , type) => {
        const dataRow = data.find(row => row.id == id);
        const msj = editType[type](dataRow.cliente);
        const response = confirm(msj);
        console.log(response)
        
        if (response) {
            const newData = [...data];
            const dataIndex = newData.findIndex(row => row.id == id);
            const row = newData[dataIndex]
            newData[dataIndex] = {...row, ...changes}
            console.log(newData[dataIndex])
            setData(newData)
            
            fetch(`${API_CNVT}/${id}`,{
                method : 'PATCH',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(changes) 
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
    }

    const [modalRegistroIsOpen , setModalRegistroIsOpen ] = useState(false);

    // useEffect(() => {} , [])

    return (
        <RegistroContext.Provider value={{
            data, setData,
            modalRegistroIsOpen , setModalRegistroIsOpen ,
            loading,
            editRow
        }}>
            {children}
        </RegistroContext.Provider>
    )
}