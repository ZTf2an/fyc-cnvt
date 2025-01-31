import { useContext } from "react";
import { RegistroContext } from "../../Context";
import Loader from "../Loader";
import TableRow from "./TableRow";
import './TableGestion.css';

function TableGestion () {
    const { data , searchedData , serverError , loading } = useContext(RegistroContext);
    return (
        <>
        <div className="my-3">
            <table className='table table-hover table-bordered align-middle rounded'>
                <thead className="table-primary position-sticky">
                    <tr>
                        <th className="p-3" scope="col">Cliente</th>
                        <th className="p-3" width="5%" scope="col">Fecha</th>
                        <th className="p-3" width="3%" scope="col">Modalidad</th>
                        <th className="p-3" width="3%" scope="col">Predios</th>
                        <th className="p-3" width="4%" scope="col">tel</th>
                        <th className="p-3" width="5%" scope="col">Carpeta</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedData.map( 
                        row => (row.aceptado && row.active) && 
                            <TableRow key={row.id} row={row}/>
                    )}
                </tbody>
            </table>
            {serverError ? 'No hay comunicacion con el servidor 😯' : loading ? <Loader/> : !(data.find(row => (row.aceptado))) && 'No hay datos'}
        </div>
        </>
    )
}
export default TableGestion