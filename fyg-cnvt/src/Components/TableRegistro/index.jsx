import { useContext } from "react";
import { RegistroContext } from "../../Context";
import { API_CNVT } from "../../Globals/API";
import TableRow from "./TableRow";
import Loader from "../Loader";
import './TableRegistro.css'

function TableRegistro () {
    const { data , searchedData , loading , editRow ,serverError } = useContext(RegistroContext);

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
                        <th className="p-3" width="1" scope="col">Doc</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                        <th className="p-3" width="1" scope="col">Acepta</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedData.map( row => row.active && <TableRow key={row.id} row={row} edit={editRow}/>)}
                </tbody>
            </table>
            {serverError ? 'No hay comunicacion con el servidor 😯' : loading && <Loader/>}
            {!data && 'No hay datos aún'}            
        </div>
        </>
    )
}

export default TableRegistro