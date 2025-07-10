import { useContext , useState} from "react";
import { Badge, Button } from "react-bootstrap";
import { RegistroContext } from "../../Context";
import TableRow from "./TableRow";
import Loader from "../Loader";
import ServerError from "../ErrorComponents/ServerError";
import './TableCobranza.css'

function TableCobranza () {
    const { 
        data , loading , editRow , searchedData , serverError , 
        setEditSideIsOpen , setRegistroToEdit , sendMail , editSideType ,
        setEditSideType , orderContition , setOrderCondition , orderIcon , setOrderIcon , ordenarFecha
    } = useContext(RegistroContext);

    return (
        <>
        <div className="my-3 table-wrapper">
            <table className='table table-striped table-bordered align-middle rounded'>
                <thead className="table-danger position-sticky">
                    <tr>
                        <th className="p-3" scope="col">
                            Cliente <Badge bg="secondary">{searchedData.filter(i=>i.active && i.aceptado).length}</Badge>
                        </th>
                        <th className="p-3" scope="col">Nit</th>
                        <th className="p-3" width="3%" scope="col">valor</th>
                        <th className="p-3" width="3%" scope="col">Modalidad</th>
                        <th className="p-3" width="5%" scope="col"><Button variant="outline-dark" value={orderContition} onClick={ordenarFecha}>Fecha{orderIcon}</Button></th>
                        <th className="p-3" width="3%" scope="col">Duracion</th>
                        <th className="p-3" width="6%" scope="col" hidden>Email</th>
                        <th className="p-3" width="4%" scope="col">Cuenta%</th>
                        <th className="p-3" width="4%" scope="col">Cta%N</th>
                        <th className="p-3" width="1" scope="col">Pdf</th>
                        <th className="p-3" width="1" scope="col">Doc</th>
                        <th className="p-3" width="5%" scope="col">Pago</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedData.map( 
                        row => (row.aceptado && row.active) && 
                            <TableRow 
                                key={row.id} 
                                row={row} 
                                edit={editRow} 
                                openEditor={setEditSideIsOpen} 
                                setEditorType={setEditSideType}
                                registroToEdit={setRegistroToEdit}
                                reenviarCorreo={sendMail}
                            />)
                    }
                </tbody>
            </table>
            {/* {} */}
            {serverError ? <ServerError/> : loading ? <Loader/> : !(data.find(row => (row.aceptado))) && 'No hay datos'}
        </div>
        </>
    )
}

export default TableCobranza