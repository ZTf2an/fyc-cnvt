import { useContext } from "react";
import { RegistroContext } from "../../Context";
import Cotizador from "../Cotizador";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';

function EditModal({ regTarget }) {
    const { editRow , editModalIsOpen , setEditModalIsOpen} = useContext(RegistroContext);
  
    return (
      <>
        <Modal show={editModalIsOpen} onHide={() => setEditModalIsOpen(false)} dialogClassName="modal-90w" size="xl">
          <ModalHeader closeButton>
            <ModalTitle>Editor de Registro</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Cotizador object={regTarget} formName={"editarRegistro"} edit={editRow} modalIsOpen={setEditModalIsOpen}/>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setEditModalIsOpen(false)}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit" form="editarRegistro">
              Guardar Cambios
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

export default EditModal;