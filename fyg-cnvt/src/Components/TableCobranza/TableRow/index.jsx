import { FaCheckSquare , FaRegCheckSquare ,FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { SiGoogledocs } from "react-icons/si";
import { TbCashRegister } from "react-icons/tb";

function TableRow({row , edit}) {
    const fecha = new Date(row.fecha);
    return (
        <tr key={row.id} className={row.pagado && "success"}>
            <td>{row.cliente}</td>                            
            <td>{row.nit}</td>                            
            <td>$500.000</td>                            
            <td>
                <select className="form-select form-select-sm" aria-label=".form-select-sm">
                    <option dafault="true">selecciona</option>
                    <option >P-tarjetas</option>
                    <option >P-Controles</option>
                    <option >Virtual</option>
                    <option >Mixta</option>
                </select>
            </td>                            
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
                <div className="d-flex justify-content-center"  onClick={e => console.log('click')}>
                    <div className="d-flex justify-content-between">
                        <TbCashRegister className="icon-casher fs-4 pointer me-2"/>
                        <input type="checkbox" className="check-payment"/>
                    </div>
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between">
                    <HiOutlineMail className="icon-msg fs-3 mx-1 pointer" />
                    <FaRegEdit className="icon-edit fs-4 ms-1 pointer" />
                    <RiDeleteBin6Fill className="icon-del fs-4 mx-1 pointer" onClick={e => {edit(row.id , {aceptado : false} , 'rechazar')}}/>
                </div>
            </td>
        </tr>
    )
}

export default TableRow