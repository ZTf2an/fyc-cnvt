import { useContext , useState} from "react";
import { RegistroContext } from "../../Context";
import TableRow from "./TableRow";
import './TableCobranza.css'
import Loader from "../Loader";

function TableCobranza () {
    const { data , loading , editRow , searchedData , serverError , setEditSideIsOpen , setRegistroToEdit} = useContext(RegistroContext);

    return (
        <>
        <div className="my-3 table-wrapper">
            <table className='table table-striped table-bordered align-middle rounded'>
                <thead className="table-primary position-sticky">
                    <tr>
                        <th className="p-3" scope="col">Cliente</th>
                        <th className="p-3" scope="col">Nito</th>
                        <th className="p-3" width="3%" scope="col">valor</th>
                        <th className="p-3" width="3%" scope="col">Modalidad</th>
                        <th className="p-3" width="5%" scope="col">Fecha</th>
                        <th className="p-3" width="3%" scope="col">Predios</th>
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
                        row => (row.aceptado && row.active) && <TableRow key={row.id} row={row} edit={editRow} openEditor={setEditSideIsOpen} registroToEdit={setRegistroToEdit}/>)
                    }
                </tbody>
            </table>
            {/* {} */}
            {serverError ? 'No hay comunicacion con el servidor 😯' : loading ? <Loader/> : !(data.find(row => (row.aceptado))) && 'No hay datos'}
        </div>
        </>
    )
}

export default TableCobranza