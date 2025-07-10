import { useContext } from "react";
import { Badge, Button , Modal } from "react-bootstrap";
import { RegistroContext } from "../../Context";
import Loader from "../Loader";
import TableRow from "./TableRow";
import GestionEditModal from "../GestionEditModal";
import ServerError from "../ErrorComponents/ServerError";
import './TableGestion.css';

function TableGestion () {
    const { data , searchedData , serverError ,
          loading , orderContition , setRegistroToEdit ,
          orderIcon , ordenarFecha , editRow ,
          setEditGestionModalIsOpen
        } = useContext(RegistroContext);
    return (
        <>
        <GestionEditModal/>
        <div>
            <table className='table table-hover table-bordered align-middle rounded'>
                <thead className="table-warning position-sticky">
                    <tr>
                        <th className="p-3" scope="col"> 
                            Cliente <Badge bg="secondary">{searchedData.filter(i=>i.active && i.aceptado).length}</Badge>
                        </th>
                        <th className="p-3" width="3%" scope="col">Predios</th>
                        <th className="p-3" width="8%" scope="col"><Button variant="outline-dark" value={orderContition} onClick={ordenarFecha}>Fecha{orderIcon}</Button></th>
                        <th className="p-3" width="10%" scope="col">Modalidad</th>
                        <th className="p-3" width="4%" scope="col">tel</th>
                        <th className="p-3" width="5%" scope="col">Cta</th>
                        <th className="p-3" width="5%" scope="col">Carpeta</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedData.map( 
                        row => (row.aceptado && row.active) && 
                            <TableRow 
                                key={row.id} 
                                row={row}
                                editRow={editRow}
                                openModal={setEditGestionModalIsOpen}
                                registroToEdit={setRegistroToEdit}
                            />
                    )}
                </tbody>
            </table>
            {serverError ? <ServerError/> : loading ? <Loader/> : !(data.find(row => (row.aceptado))) && 'No hay datos'}
        </div>
        </>
    )
}
export default TableGestion