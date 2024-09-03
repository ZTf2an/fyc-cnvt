import { IoMdAddCircleOutline } from "react-icons/io";
import TableRegistro from "../../Components/TableRegistro";
import Searcher from "../../Components/Searcher";
import Layout from "../../Components/Layout";

function Registro ({data}) {
    return (
        <>
            <div className="mb-2 d-flex">
                <button type="button" className="btn btn-primary d-flex me-2 align-items-center" title="Nuevo Registro de Cotización"> 
                <IoMdAddCircleOutline className="fs-4 me-2"/>
                Nuevo
                </button>
                <Searcher />
            </div>
            <TableRegistro />
        </>
    )
}

export default Registro