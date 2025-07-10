import { createContext, useEffect, useState } from "react";
import { API_CNVT, API_GAS } from "../Globals/API";

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
    const [editSideType , setEditSideType] = useState('Form');
    const [editGestionModalIsOpen , setEditGestionModalIsOpen] = useState(false);

    //Ordenar la data por fecha
    const [orderContition , setOrderCondition] = useState('none');
    const [orderIcon , setOrderIcon] = useState('');

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
            item.tel ,
            item.remitenteCuenta ,
            !item.docsCuenta && "nocuenta"
        ].join(' ')
        return {...item , registroData : registroData , cobranzaData : cobranzaData}
        }
    );

    // Ordenar la data por fecha - Logica del ordenador
    if (orderContition === 'mayor') {
        formatedData.sort((a,b) => {
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            return dateB - dateA;
        });
    } else if (orderContition === 'menor') {
        formatedData.sort((a,b) => {
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            return dateA - dateB;
        });
    };

    const ordenarFecha = (e) => {
        if (e.target.value === 'none') {
            setOrderCondition('mayor');
            setOrderIcon('🔼');
        } else if (e.target.value === 'mayor') {
            setOrderCondition('menor');
            setOrderIcon('🔽');
        } else if (e.target.value === 'menor') {
            setOrderCondition('none');
            setOrderIcon('');
        }
    };

    //Valor a Buscar en el Searcher - Logica del buscador
    const [searchValue , setSearchValue] = useState('');
    const searchedData = formatedData.filter(
        item => item.registroData.toLowerCase().includes(searchValue.toLowerCase()) || 
        item.cobranzaData.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    //Extrae la data de la hoja Sheets - la url es del servidor local http://localhost:3000
    const fetchData = () => {
        console.log('iniciando el fetch de datos');
        setData([]); //borrar
        setServerError(false);
        setLoading(true);
        fetch(API_CNVT+"/registros")
        .then(response=> response.json())
        .then(data => {
            setData(data.reverse());
            setLoading(false);
        })
        .catch(error => setServerError(true));
        console.log('fetch de datos finalizado');
    };
    useEffect(()=>{
        fetchData();
    },[]);

    const editType = {
        "modalidad" : (nombreCliente) => (`Está cambiando la modalidad de ${nombreCliente}`),
        "aceptar" : (nombreCliente) => (`¿Está seguro de que quiere enviar a ${nombreCliente} a la pagina de Cobranza?`),
        "rechazar" : (nombreCliente) => (`¿Está seguro de que quiere eliminar a ${nombreCliente} de la pagina de cobranza y Gestión?`),
        "eliminar" : (nombreCliente) => (`¿Está seguro de que quiere eliminar a ${nombreCliente}?`),
        "lote" : (nombreCliente) => (`¿Está seguro de que quiere guardar los cambios hechos a ${nombreCliente}?`),
        "pdf" : (nombreCliente => (`Está seguro de que quiere generar nuevamente el pdf de ${nombreCliente}?`)),
        "docs" : (nombreCliente => (`Está seguro de que quiere generar nuevamente la cotización con los nuevos datos, de ${nombreCliente}?`)),
        "docsCuenta" : (nombreCliente => (`Está seguro de que quiere generar Cuenta de cobro con los nuevos datos, de ${nombreCliente}?`)),
        "modoCTA" : (nombreCliente => (`Está seguro de que quiere cambiar el porcentaje de cuenta de ${nombreCliente}?`)),
        "remitenteCuenta" : (nombreCliente => (`Está por cambiar el nombre de la cuenta de cobro que se enviará a ${nombreCliente}?`)),
        "checkPago" : (nombreCliente => (`Está seguro que ${nombreCliente} Ha pagado el servicio completamente?`)),
        "createFolder" : (nombreCliente => (`Está seguro que quiere crear carpeta de ${nombreCliente}?`)),
        "none": (nombreCliente)=>('none')
    }
    
    const editRow = (id , changes , type , changesToServer = true) => {
        const dataRow = data.find(row => row.id == id);
        const msj = editType[type](dataRow.cliente);
        const response = msj == 'none' ? true : confirm(msj) ;
        console.log(response);

    
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
                    fetch(`${API_CNVT}/globals`,{
                        method : 'POST' , // cambiar a post antes de hacer la prueba
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify({
                            url : `${API_GAS}?type=update`,
                            body : {id : id , data : changes}
                        })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error))

                } else {
                    fetch(`${API_CNVT}/globals`,{
                        method : 'POST',
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify({
                            url : `${API_GAS}?type=edit`,
                            body : {id : id , data : changes},
                        }) 
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error))
                };

            };
        };
        return response
    };


    const [modalRegistroIsOpen , setModalRegistroIsOpen ] = useState(false);

    // useEffect(() => {} , [])

    // Util reenviar los correos
    const sendMail = (obj , type) => {
        console.log(obj.id);
        if (confirm("Está por enviar el correo de "+obj.cliente)) {
           fetch(`${API_CNVT}/globals`,{
                method : 'POST',
                headers : {
                     'Content-Type': 'application/json'
                },
                body : JSON.stringify({url : `${API_GAS}?type=sendMail&docType=${type}` , body : {data:obj}})
            })
              .then(response => response.json())
              .then(data => alert(JSON.parse(data).msj))
              .catch(error => console.log(error))
        } else {
            return false;
        };
    }

    return (
        <RegistroContext.Provider value={{
            fetchData,
            data, setData,
            searchedData,
            orderContition , setOrderCondition,
            orderIcon , setOrderIcon ,
            modalRegistroIsOpen , setModalRegistroIsOpen ,
            loading, serverError,
            editRow,
            sendMail,
            searchValue , setSearchValue ,
            registroToEdit , setRegistroToEdit ,
            editModalIsOpen , setEditModalIsOpen,
            editSideIsOpen , setEditSideIsOpen ,
            editSideType , setEditSideType ,
            editGestionModalIsOpen , setEditGestionModalIsOpen ,
            ordenarFecha
        }}>
            {children}
        </RegistroContext.Provider>
    )
}