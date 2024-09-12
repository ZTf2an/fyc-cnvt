import { FaCheckSquare , FaRegCheckSquare ,FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { SiGoogledocs } from "react-icons/si";

function TableRow ({row , edit}) {
    const fecha = new Date(row.fecha);

    return(
        <tr className={row.aceptado ? "table-success" : undefined }>
            <td>{row.cliente}</td>                            
            <td>{fecha.toLocaleDateString('es-ES', {month : 'short' , day :'numeric' })}</td>
            <td className="text-end">{row.predios}</td>
            <td>{row.email}</td>
            <td>{row.tel}</td>
            <td>
                <div className="d-flex justify-content-center">
                    <a href={row.pdf} target="_blank">
                        <PiFilePdf className="pdf-icon fs-4 pointer"/>
                    </a>
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    <a href={row.docs} target="_blank">
                        <SiGoogledocs className="g-docs-icon fs-4 pointer"/>
                    </a>
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between">
                    <HiOutlineMail className="icon-msg fs-3 mx-1 pointer" />
                    <FaRegEdit className="icon-edit fs-4 ms-1 pointer" />
                    <RiDeleteBin6Fill className="icon-del fs-4 mx-1 pointer" onClick={e => edit(row.id , {active:false} , 'eliminar')}/>
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-center" >
                    {row.aceptado ? 
                        <FaCheckSquare className="icon-check fs-4 pointer"/> : 
                        <FaRegCheckSquare className="icon-check fs-4 pointer" onClick={e => edit(row.id , {aceptado : true} , 'aceptar')}/>
                    }
                </div>
            </td>
        </tr>
    )
}

export default TableRow