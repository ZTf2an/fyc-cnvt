import { Form , Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { IoFolderOpenSharp } from "react-icons/io5";
import { MdFolderOff , MdOutlineAddToDrive } from "react-icons/md";
import { apiPost } from "../../services/apiPetition";
import TooltipedIcon from "../TooltipedIcon";
import { safeParse } from "../../Utils/safeParse";
import { getRelativeTime } from "../../Utils/formatDate";

function TableRow ({row , editRow , openModal , registroToEdit , toast }) {
    const preFecha = new Date(row.fecha);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

    const validarFecha = (fecha) => {
        const toDate = new Date();
        if (fecha < toDate) {
            return true
        } else {
            return false
        };
    };

    const getLastUrl =  ( string ) => {
        const url = safeParse( string , [string] );
        return url[url.length -1]
    };
    
    const crearCarpeta = (item) => {
        if (!item.driveFolder) {
            editRow(item.id , { driveFolder : 'load'} , 'createFolder' , false);
            
            const onSuccesHandler = data => {
                console.log(data);
                const result = JSON.parse(data);
                toast({status : result.status , msj : `Carpeta de ${item.cliente}:\n${result.msj}`});
                editRow(item.id , {driveFolder : result.url} , 'none' , false);
            };

            const onErrorHandler = error => {
                toast({status : 'error' , msj : error})
            };

            apiPost({type : 'createFolder'} , {id : item.id , data : item} , onSuccesHandler , onErrorHandler)
        };
    };

    const sendMail = (item) => {
        const response = confirm('¿Está Seguro de que quiere enviar los informes de '+item.cliente+'?');
        if (response) {

            const onSuccesHandler = data => {
                const result = JSON.parse(data);
                editRow( item.id , {msjLogs : JSON.stringify(result.msjLogs)} , "none" , false);
                toast({status: result.status , msj : result.msj});
            };

            const onErrorHandler = error => {
                toast({status : "error" , msj : error});
            };

            apiPost({type:'sendMail' , docType : 'folder'} , { data : item} , onSuccesHandler , onErrorHandler );
        };
        return response
    };
    
    return (<tr className={validarFecha(fecha) ? 'table-info' : ''}>
        <td className="p-3" title={`Correo: ${row.email}\nDireccion: ${row.direccion}`}>{row.cliente}</td>
        <td className="p-3">{row.predios}</td>
        <td className="p-3">{fecha.toLocaleDateString('es-ES' , {day : 'numeric' , month : 'short'})}</td>
        <td className="p-3">
            <Form.Select value={row.modalidad} onChange={e => editRow(row.id , {modalidad: e.target.value} , 'modalidad')}>
                <option dafault="true">selecciona</option>
                <option >P-tarjetas</option>
                <option >P-Controles</option>
                <option >Virtual</option>
                <option >Mixta</option>
            </Form.Select>
        </td>
        <td className="p-3">{row.tel}</td>
        <td className="">
            <div className="d-flex justify-content-center">
                <a className={row.pdfCuenta? "fs-4 icon-pdf" : " fs-4 icon-disabled"} href={getLastUrl(row.pdfCuenta)}><PiFilePdf/></a>
            </div>
        </td>
        <td className="p-3">
            <div className="d-flex justify-content-center">
                {row.driveFolder ? 
                    row.driveFolder === 'load' ?
                    <Spinner animation="border" variant="secondary"><span className="visually-hidden">Loading...</span></Spinner>:
                        <a href={row.driveFolder} target="_blank"><IoFolderOpenSharp className="icon-folder fs-4 pointer"/></a> :
                    <MdFolderOff className="icon-disabled fs-4 pointer"/>
                }
            </div>
        </td>
        <td className="p-3">
            <div className="d-flex justify-content-between">
                {row.driveFolder ?
                    row.pagado? 
                    <TooltipedIcon configObj={{logs : safeParse(row.msjLogs , {folders:[]}).folders?.map(i=>getRelativeTime(i))}}>
                        <HiOutlineMail className="icon-msg fs-3 mx-1 pointer" type="button" onClick={e => sendMail(row)}/>
                    </TooltipedIcon>:
                    <HiOutlineMail className="icon-disabled fs-3" title="No se puede enviar los informes porque el cliente no ha pagado"/>:
                    <MdOutlineAddToDrive 
                    className={ "generateFolder-icon pointer fs-3"}
                    title="Click para Crear Carpeta"
                    onClick={e => crearCarpeta(row)}
                    />
                    
                }
                <FaRegEdit className="icon-edit fs-4 ms-1 pointer" type="button" onClick={e=> {openModal(true); registroToEdit(row)}} />
                <RiDeleteBin6Fill className="icon-del fs-4 mx-1 pointer" onClick={e => editRow(row.id , {aceptado : false} , 'rechazar')}/>
            </div>
        </td>
    </tr>)
}

export default TableRow