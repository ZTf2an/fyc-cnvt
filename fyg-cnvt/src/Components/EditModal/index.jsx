import { useContext } from "react";
import { RegistroContext } from "../../Context";
import Cotizador from "../Cotizador";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button, Stack , Row, Container } from 'react-bootstrap';
import { API_CNVT , API_GAS} from "../../Globals/API";

function EditModal({ regTarget }) {
    const { editRow , editModalIsOpen , setEditModalIsOpen } = useContext(RegistroContext);

    const editPdf = (target) => {
      editRow(target.id , {pdf : 'load'} , 'pdf' , false);
      setEditModalIsOpen(false);

      fetch(`${API_CNVT}/globals`,{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            url :`${API_GAS}?type=createpdf&docType=COTIZACION`, 
            body : {id : target.id , data : {url : target.docs} }
        })
        // body : JSON.stringify({url : target.docs})
      }).then(response => response.json())
      .then(data => { 
        data = JSON.parse(data);
        editRow(target.id , {pdf : data.url} , 'none' , false)
        console.log(data)
      })
      .catch(e => console.log(e))
    };

    const updateDocs = (target) => {
      editRow(target.id , {docs : 'load'} , 'docs' , false);
      setEditModalIsOpen(false);
      
      fetch(`${API_CNVT}/globals`,{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          url :`${API_GAS}?type=updateDocs&docType=COTIZACION`, 
          body : {id : target.id , data : target }
        }),
      }).then(response => response.json())
      .then(data => {
        data = JSON.parse(data);
        editRow(target.id , {docs : data.url} , 'none' , false);       
        console.log(data);
      })
      .catch(e => console.log(e))
    };
  
    return (
      <>
        <Modal show={editModalIsOpen} onHide={() => setEditModalIsOpen(false)} dialogClassName="modal-90w" size="xl">
          <ModalHeader closeButton>
            <ModalTitle>Editor de Registro</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Cotizador object={regTarget} formName={"editarRegistro"} edit={editRow} modalIsOpen={setEditModalIsOpen} changes={false}/>
          </ModalBody>
          <ModalFooter>
            <Container fluid>
              <Stack direction="horizontal" className="w-full" gap={3}>
                <Button variant="outline-danger" hidden={!regTarget.docs} onClick={() => editPdf(regTarget)}>
                  Actualizar PDF
                </Button>
                <Button variant="outline-info" onClick={() => updateDocs(regTarget)}>
                  Actualizar Docs
                </Button>
                <Button variant="secondary" className="ms-auto" onClick={() => setEditModalIsOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit" form="editarRegistro">
                  Guardar Cambios
                </Button>
              </Stack>
            </Container>
          </ModalFooter>
        </Modal>
      </>
    );
  }

export default EditModal;