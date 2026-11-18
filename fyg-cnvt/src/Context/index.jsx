import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../services/apiPetition";
import { AuthContext } from "../auth";
import {
    createErpThirdParty,
    fetchErpThirdParties,
    hasErpThirdParty,
    normalizeErpDocument
} from "../services/erpApi";
import getLastUrl from "../Utils/getLastUrl";

export const RegistroContext = createContext();

export const RegistroProvider= ({children}) => {
    const { token , logout } = useContext(AuthContext);

    //Carga de datos al inicio de la aplicacion.
    const [loading , setLoading] = useState(true);
    const [serverError , setServerError] = useState(false);
    const [data , setData] = useState([]);
    
    //Registro que se editará cuando se da click al botón de editar
    const [registroToEdit , setRegistroToEdit] = useState({});
    // console.log(JSON.stringify(registroToEdit) + 'desde context')
    const [registroModalIsOpen , setRegistroModalIsOpen] = useState(false);
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
    
    //TOAST | contiene todo lo Relacionado con la creacion de los Toast
    const [activeToast, setActiveToast] = useState([]);
    const [newToast, setNewToast] = useState(null);
    const [erpStatus, setErpStatus] = useState('checking');
    const [erpThirdParties, setErpThirdParties] = useState([]);

    const erpDocumentNumbers = useMemo(
        () => new Set(erpThirdParties.map(thirdParty => normalizeErpDocument(thirdParty.identificacion))),
        [erpThirdParties]
    );

    const isClientInErp = useCallback(
        documentNumber => {
            const document = normalizeErpDocument(documentNumber);
            return Boolean(document) && erpDocumentNumbers.has(document);
        },
        [erpDocumentNumbers]
    );

    const refreshErp = useCallback(async () => {
        setErpStatus('checking');
        try {
            const thirdParties = await fetchErpThirdParties();
            setErpThirdParties(thirdParties);
            setErpStatus('connected');
            return true;
        } catch {
            setErpStatus('contingency');
            return false;
        }
    }, []);

    useEffect(() => {
        if (newToast) {
            setActiveToast(prev => [...prev, newToast]);
        }
    }, [newToast]);
    
    
    //Extrae la data de la hoja Sheets - la url es del servidor local http://localhost:3000
    const fetchData = useCallback(() => {
        console.log('iniciando el fetch de datos');
        setData([]); //borrar
        setServerError(false);
        setLoading(true);
        setActiveToast([])
        
        const onSuccessHandler = (data) => {
            setData(data.reverse());
            setLoading(false);
        };
        const onErrorHandler = (error) => {
            setServerError(true);
            setNewToast({msj: error || "No hay conexión. Revisar internet."})
            logout();

        };
        apiGet('/registrosCaribe' , onSuccessHandler , onErrorHandler, token)
        console.log('fetch de datos finalizado');
    }, [token]);
    useEffect(() => {
        if (token) fetchData();
    }, [fetchData, token]);

    useEffect(()=>{
        refreshErp();
    },[refreshErp]);

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

    
        if (response) {
            const newData = [...data];
            const dataIndex = newData.findIndex(row => row.id == id);
            const row = newData[dataIndex];
            newData[dataIndex] = {...row, ...changes};
            console.log(newData[dataIndex]);
            setData(newData);
            setRegistroToEdit(newData[dataIndex]);

            if ( changesToServer ){
                console.log('Se están enviando los datos al servidor')
                if (type === 'lote') {
                    
                    const onSuccesHandler = data => {
                        setNewToast(JSON.parse(data))
                    };

                    const onErrorHandler = error => {
                        setNewToast({status:"Error" , msj:error})
                    };

                    apiPost({type : 'update'} , {id : id , data : changes} , onSuccesHandler , onErrorHandler);

                } else {
                    const onSuccesHandler = data => {
                        setNewToast(JSON.parse(data));
                    };

                    const onErrorHandler = error => {
                        setNewToast({ status:"Error",msj:error});
                    };

                    apiPost({type : 'edit'} , {id : id , data : changes} , onSuccesHandler ,onErrorHandler);
                   
                };

            };
        };
        return response
    };


    const [modalRegistroIsOpen , setModalRegistroIsOpen ] = useState(false);

    // useEffect(() => {} , [])

    // Util reenviar los correos
    const sendMail = (obj , type) => {
        obj.pdf = getLastUrl(obj.pdf);
        obj.pdfCuenta = getLastUrl(obj.pdfCuenta);
        
        if (confirm("Está por enviar el correo de "+obj.cliente)) {
            const onSuccesHandler = data => {
                data = JSON.parse(data);
                editRow(obj.id , {msjLogs : JSON.stringify(data.msjLogs)}, "none" , false)
                console.log(data.msjLogs)
                setNewToast(data);
            };

            const onErrorHandler = error => {
                setNewToast({ status:"Error",msj:error});
            };

            apiPost(
                {type : 'sendMail' , docType : type , token : token} ,
                {data:obj} , onSuccesHandler , onErrorHandler
            );
        } else {
            return false;
        };
    }

    const syncClientWithErp = async client => {
        const document = normalizeErpDocument(client.nit);
        if (!document) {
            throw new Error('Ingresa un NIT válido antes de sincronizar con el ERP.');
        }
        if (!String(client.cliente ?? '').trim()) {
            throw new Error('El nombre del cliente es obligatorio para sincronizar con el ERP.');
        }
        if (erpStatus !== 'connected') {
            return null;
        }
        if (hasErpThirdParty(erpThirdParties, document)) {
            throw new Error('Este NIT ya existe como tercero en el ERP.');
        }

        try {
            const createdThirdParty = await createErpThirdParty(client);
            setErpThirdParties(current => hasErpThirdParty(current, document)
                ? current
                : [...current, {
                    ...createdThirdParty,
                    identificacion: createdThirdParty.identificacion || document
                }]);
            setErpStatus('connected');
            return createdThirdParty;
        } catch (error) {
            if (!error.status || error.status >= 500 || [401, 403, 429].includes(error.status)) {
                setErpStatus('contingency');
                return null;
            }

            throw error;
        }
    };

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
            registroModalIsOpen , setRegistroModalIsOpen ,
            editModalIsOpen , setEditModalIsOpen,
            editSideIsOpen , setEditSideIsOpen ,
            editSideType , setEditSideType ,
            editGestionModalIsOpen , setEditGestionModalIsOpen ,
            ordenarFecha,
            activeToast , newToast , setNewToast
            , erpStatus, refreshErp, isClientInErp, syncClientWithErp
        }}>
            {children}
        </RegistroContext.Provider>
    )
}