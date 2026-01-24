import { Form , Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { IoFolderOpenSharp , IoCopyOutline} from "react-icons/io5";
import { MdFolderOff , MdOutlineAddToDrive } from "react-icons/md";
import { API_CNVT , API_GAS } from "../../Globals/API";
import formatedDate from "../../Utils/formatDate"
import formatHour from "../../Utils/formatHour"

function TableRow ({row , editRow , openModal , registroToEdit }) {
    const preFecha = new Date(row.fecha);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

    const validarFecha = (fecha) => {
        const toDate = new Date();
        return fecha < toDate
    };

    const copiarFila = async (obj) => {
        const texto = [obj.id ,
        formatedDate(obj.fecha),
        formatHour(obj.hora),
        obj.cliente ,
        obj.nit ,
        obj.modalidad ,
        obj.predios ,
        obj.numeroControles ,
        obj.email ,
        obj.tel ,
        obj.direccion ,
        obj.notas ,].join(`\t`);
        console.log(texto)
        try {
            await navigator.clipboard.writeText(texto);
            alert("Informacion  de "+obj.cliente+" copiada ✅");
        } catch (err) {
            console.error("Error al copiar: ", err);
        }
    };
    
    const crearCarpeta = (item) => {
        if (!item.driveFolder) {
            editRow(item.id , { driveFolder : 'load'} , 'createFolder' , false);
            fetch(API_CNVT+'/globals' , {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({url : `${API_GAS}?type=createFolder` , body : {id : item.id , data : item}})
            })
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data);
                console.log(result);
                alert(result.msj);
                editRow(item.id , {driveFolder : result.url} , 'none' , false);
            })
            .catch(err => alert(`Error : ${err}`))
        };
    };

    const sendMail = (item) => {
        const response = confirm('¿Está Seguro de que quiere enviar los informes de '+item.cliente+'?');
        if (response) {
            fetch(API_CNVT+'/globals' , {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({url : `${API_GAS}?type=sendMail&&docType=folder` , body : { data : item}})
            })
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data);
                console.log(result);
                alert(result.msj);
            })
            .catch(err => alert(`Error : ${err}`))
        };
        return response
    };
    
    return (<tr className={validarFecha(fecha) ? 'table-info' : ''}>
        <td className="p-3 d-flex justify-content-between" title={`Correo: ${row.email}\nDireccion: ${row.direccion}`}>
            {row.cliente}
            <div className="align-items-middle">
            <IoCopyOutline className="fs-4 pointer" onClick={e=>copiarFila(row)} />
            </div>
        </td>
        <td className="p-2">{row.predios}</td>
        <td className="p-2">{fecha.toLocaleDateString('es-ES' , {day : 'numeric' , month : 'short'})}</td>
        <td className="p-2">
            <Form.Select value={row.modalidad} onChange={e => editRow(row.id , {modalidad: e.target.value} , 'modalidad')}>
                <option dafault="true">selecciona</option>
                <option >P-tarjetas</option>
                <option >P-Controles</option>
                <option>P-QRcode</option>
                <option >Virtual</option>
                <option >Mixta</option>
            </Form.Select>
        </td>
        <td className="p-2">{row.tel}</td>
        <td className="p-2">
            <div className="d-flex justify-content-center">
                <a className={row.pdfCuenta? "fs-4 icon-pdf" : " fs-4 icon-disabled"} href={row.pdfCuenta}><PiFilePdf/></a>
            </div>
        </td>
        <td className="p-2">
            <div className="d-flex justify-content-center">
                {row.driveFolder ? 
                    row.driveFolder === 'load' ?
                    <Spinner animation="border" variant="secondary"><span className="visually-hidden">Loading...</span></Spinner>:
                    <a href={row.driveFolder} target="_blank"><IoFolderOpenSharp className="icon-folder fs-4 pointer"/></a> : 
                    <MdFolderOff className="icon-disabled fs-4 pointer"/>
                }
            </div>
        </td>
        <td className="p-2">
            <div className="d-flex justify-content-between">
                {row.driveFolder ?
                    row.pagado? 
                    <HiOutlineMail className="icon-msg fs-3 mx-1 pointer" type="button" onClick={e => sendMail(row)}/> :
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