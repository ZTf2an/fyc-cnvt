import { createContext, useEffect, useState } from "react";
import { API_CNVT } from "../Globals/API";

export const RegistroContext = createContext();

export const RegistroProvider= ({children}) => {
    //Carga de datos al inicio de la aplicacion.
    const [loading , setLoading] = useState(true);
    const [serverError , setServerError] = useState(false);
    const [data , setData] = useState([]);
   
    //Registro que se editará cuando se da click al botón de editar
    const [registroToEdit , setRegistroToEdit] = useState({});
    // console.log(JSON.stringify(registroToEdit) + 'desde context')
    const [editModalIsOpen , setEditModalIsOpen] = useState(false);
    const [editSideIsOpen , setEditSideIsOpen] = useState(false);
    

    // Formatea Data con 2 objetos adicionales para Searcher
    const formatedData = data.map(item => {
        const preFecha = new Date(item.fecha);
        const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());
        const registroData = [
            item.cliente , 
            fecha.toLocaleDateString('es-ES', {month : 'short' , day :'numeric' }) , 
            item.predios , 
            item.email , 
            item.tel
        ].join(' ');
        const cobranzaData = [
            item.cliente ,
            item.nit ,
            item.modalidad ,
            fecha,
            item.predios ,
            item.tel
        ].join(' ')
        return {...item , registroData : registroData , cobranzaData : cobranzaData}
        }
    );

    //Valor a Buscar en el Searcher - Logica del buscador
    const [searchValue , setSearchValue] = useState('');
    const searchedData = formatedData.filter(
        item => item.registroData.toLowerCase().includes(searchValue.toLowerCase()) || 
        item.cobranzaData.toLowerCase().includes(searchValue.toLowerCase())
    );    
    
    //Extrae la data de la hoja Sheets - la url es del servidor local http://localhost:3000
    useEffect(()=>{
        fetch(API_CNVT)
        .then(response=> response.json())
        .then(data => {
            setData(data.reverse());
            setLoading(false);
        })
        .catch(error => setServerError(true));
    },[]);

    const editType = {
        "modalidad" : (nombreCliente) => (`Está cambiando la modalidad de ${nombreCliente}`),
        "aceptar" : (nombreCliente) => (`¿Está seguro de que quiere enviar a ${nombreCliente} a la pagina de Cobranza?`),
        "rechazar" : (nombreCliente) => (`¿Está seguro de que quiere eliminar a ${nombreCliente} de la pagina de cobranza?`),
        "eliminar" : (nombreCliente) => (`¿Está seguro de que quiere eliminar a ${nombreCliente}?`),
        "lote" : (nombreCliente) => (`¿Está seguro de que quiere guardar los cambios hechos a ${nombreCliente}?`),
        "pdf" : (nombreCliente => (`Está seguro de que quiere generar nuevamente el pdf de ${nombreCliente}?`)),
        "modoCTA" : (nombreCliente => (`Está seguro de que quiere cambiar el porcentaje de cuenta de ${nombreCliente}?`)),
        "none": (nombreCliente)=>('none')
    }
    
    const editRow = (id , changes , type , changesToServer = true) => {
        const dataRow = data.find(row => row.id == id);
        const msj = editType[type](dataRow.cliente);
        const response = msj == 'none' ? true : confirm(msj) ;
        console.log(response)

    
        if (response) {
            const newData = [...data];
            const dataIndex = newData.findIndex(row => row.id == id);
            const row = newData[dataIndex];
            newData[dataIndex] = {...row, ...changes}
            console.log(newData[dataIndex])
            setData(newData)

            if ( changesToServer ){
                console.log('Se están enviando los datos al servidor')
                if (type === 'lote') {
                    fetch(`${API_CNVT}/${id}`,{
                        method : 'PUT' ,
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify(changes)
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error))

                } else {
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
                };

            }
        };
        
        
    };


    const [modalRegistroIsOpen , setModalRegistroIsOpen ] = useState(false);

    // useEffect(() => {} , [])

    return (
        <RegistroContext.Provider value={{
            data, setData,
            searchedData,
            modalRegistroIsOpen , setModalRegistroIsOpen ,
            loading, serverError,
            editRow,
            searchValue , setSearchValue ,
            registroToEdit , setRegistroToEdit ,
            editModalIsOpen , setEditModalIsOpen,
            editSideIsOpen , setEditSideIsOpen
        }}>
            {children}
        </RegistroContext.Provider>
    )
}