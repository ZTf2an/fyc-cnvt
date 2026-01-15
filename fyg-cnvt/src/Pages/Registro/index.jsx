import { useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RegistroContext } from "../../Context";
import TableRegistro from "../../Components/TableRegistro";
import Searcher from "../../Components/Searcher";
import RegistroModal from "../../Components/Modal";
import EditModal from "../../Components/EditModal";

function Registro () {
    const {searchValue , setSearchValue , registroToEdit , registroModalIsOpen , setRegistroModalIsOpen} = useContext(RegistroContext)
    return (
        <>
            <div className="mb-2 d-flex">
                <button 
                    type="button" 
                    className="btn btn-primary d-flex me-2 align-items-center" 
                    title="Nuevo Registro de Cotización"
                    // data-bs-toggle="modal"
                    // data-bs-target="#registroModal"
                    onClick={e=>setRegistroModalIsOpen(true)}
                > 
                <IoMdAddCircleOutline className="fs-4 me-2"/>
                Nuevo
                </button>
                <Searcher change={setSearchValue} searchValue={searchValue}/>
            </div>
            <TableRegistro />
            <RegistroModal />
            <EditModal regTarget={registroToEdit}/>
        </>
    )
}

export default Registro