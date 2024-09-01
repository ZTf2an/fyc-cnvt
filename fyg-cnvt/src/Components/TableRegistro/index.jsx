import { FaCheckSquare , FaRegCheckSquare ,FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { SiGoogledocs } from "react-icons/si";
import './TableRegistro.css'

function TableRegistro () {
    return (
        <>
        <div className="my-3">
            <table className='table table-striped table-bordered align-middle rounded'>
                <thead className="table-primary position-sticky">
                    <tr>
                        <th className="p-3" scope="col">Cliente</th>
                        <th className="p-3" width="5%" scope="col">Fecha</th>
                        <th className="p-3" width="3%" scope="col">Predios</th>
                        <th className="p-3" width="6%" scope="col">Email</th>
                        <th className="p-3" width="4%" scope="col">tel</th>
                        <th className="p-3" width="1" scope="col">Pdf</th>
                        <th className="p-3" width="1" scope="col">Docs</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                        <th className="p-3" width="1" scope="col">Acepta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Caminos de Lia</td>
                        <td>Sept 6</td>
                        <td className="text-end">200</td>
                        <td>steffan.pardorios@gmail.com</td>
                        <td>3003631311</td>
                        <td>
                            <div className="d-flex justify-content-center">
                                <PiFilePdf className="pdf-icon fs-4 pointer"/>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex justify-content-center">
                                <SiGoogledocs className="g-docs-icon fs-4 pointer"/>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex justify-content-between">
                                <HiOutlineMail className="icon-msg fs-3 mx-1 pointer" />
                                <FaRegEdit className="icon-edit fs-4 ms-1 pointer" />
                                <RiDeleteBin6Fill className="icon-del fs-4 mx-1 pointer" />
                            </div>
                        </td>
                        <td>
                            <div className="d-flex justify-content-center">
                                {/* <FaCheckSquare /> */}
                                <FaRegCheckSquare className="icon-check fs-4 pointer" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TableRegistro