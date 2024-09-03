import { useContext } from "react";
import { FaCheckSquare , FaRegCheckSquare ,FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { SiGoogledocs } from "react-icons/si";
import { RegistroContext } from "../../Context";
import { TbCashRegister } from "react-icons/tb";
import './TableCobranza.css'

function TableCobranza () {
    const { data } = useContext(RegistroContext);
    // console.log(data[0])
    return (
        <>
        <div className="my-3">
            <table className='table table-striped table-bordered align-middle rounded'>
                <thead className="table-primary position-sticky">
                    <tr>
                        <th className="p-3" scope="col">Cliente</th>
                        <th className="p-3" scope="col">Nit</th>
                        <th className="p-3" width="3%" scope="col">valor</th>
                        <th className="p-3" width="3%" scope="col">Modalidad</th>
                        <th className="p-3" width="5%" scope="col">Fecha</th>
                        <th className="p-3" width="3%" scope="col">Predios</th>
                        <th className="p-3" width="6%" scope="col">Email</th>
                        <th className="p-3" width="4%" scope="col">tel</th>
                        <th className="p-3" width="1" scope="col">Pdf</th>
                        <th className="p-3" width="1" scope="col">Doc</th>
                        <th className="p-3" width="5%" scope="col">Pago</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( row => {
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
                                        <RiDeleteBin6Fill className="icon-del fs-4 mx-1 pointer" />
                                    </div>
                                </td>
                            </tr>
                        )}
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TableCobranza