import { useContext , useState} from "react";
import { Badge, Button } from "react-bootstrap";
import { RegistroContext } from "../../Context";
import TableRow from "./TableRow";
import Loader from "../Loader";
import ServerError from "../ErrorComponents/ServerError";
import './TableRegistro.css'

function TableRegistro () {
    const { data , 
        searchedData , 
        loading , 
        editRow ,
        serverError , 
        setRegistroToEdit , 
        setEditModalIsOpen , 
        sendMail ,
        orderContition ,
        setOrderCondition ,
        ordenarFecha ,
        orderIcon , setOrderIcon
    } = useContext(RegistroContext);

    return (
        <>
        <div className="my-3 table-wrapper" >
            <table 
                className='table table-striped table-bordered align-middle overflow-auto'
            >
                <thead 
                    className="table-primary"
                >
                    <tr>
                        <th className="p-3" scope="col">Cliente <Badge bg="secondary">{searchedData.filter(item => item.active).length}</Badge></th>
                        <th className="p-3" width="5%" scope="col"><Button variant="outline-dark" value={orderContition} onClick={ordenarFecha}>Fecha{orderIcon}</Button></th>
                        <th className="p-3" width="3%" scope="col">Predios</th>
                        <th className="p-3" width="6%" scope="col">Email</th>
                        <th className="p-3" width="4%" scope="col">tel</th>
                        <th className="p-3" width="1" scope="col">Pdf</th>
                        <th className="p-3" width="1" scope="col">Doc</th>
                        <th className="p-3" width="10%" scope="col">Acciones</th>
                        <th className="p-3" width="1" scope="col">Acepta</th>
                    </tr>
                </thead>
                <tbody >
                    {searchedData.map( 
                        row => row.active && <TableRow 
                            key={row.id} 
                            row={row} 
                            edit={editRow} 
                            setRegistroToEdit={setRegistroToEdit}
                            modalIsOpen={setEditModalIsOpen}
                            reenviarCorreo={sendMail}
                        />)}
                </tbody>
            </table>
            {serverError ? <ServerError /> : loading && <Loader/>}
            {!data && 'No hay datos aún'}            
        </div>
        </>
    )
}

export default TableRegistro