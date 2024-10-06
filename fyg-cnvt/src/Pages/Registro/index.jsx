import { useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RegistroContext } from "../../Context";
import TableRegistro from "../../Components/TableRegistro";
import Searcher from "../../Components/Searcher";
import Modal from "../../Components/Modal";
import EditModal from "../../Components/EditModal";

function Registro () {
    const {searchValue , setSearchValue} = useContext(RegistroContext)
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
                <Searcher change={setSearchValue} searchValue={searchValue}/>
            </div>
            <TableRegistro />
            <Modal />
            <EditModal regTarget={null}/>
        </>
    )
}

export default Registro