import { useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RegistroContext } from "../../Context";
import TableRegistro from "../../Components/TableRegistro";
import Searcher from "../../Components/Searcher";
import Modal from "../../Components/Modal";

function Registro ({data}) {
    const {modalRegistroIsOpen , setModalRegistroIsOpen} = useContext(RegistroContext)
    return (
        <>
            <div className="mb-2 d-flex">
                <button 
                    type="button" 
                    className="btn btn-primary d-flex me-2 align-items-center" 
                    title="Nuevo Registro de Cotización"
                    data-bs-toggle="modal"
                    data-bs-target="#registroModal"
                > 
                <IoMdAddCircleOutline className="fs-4 me-2"/>
                Nuevo
                </button>
                <Searcher />
            </div>
            <TableRegistro />
            <Modal />
        </>
    )
}

export default Registro