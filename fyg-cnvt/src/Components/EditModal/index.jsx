import { useContext, useState } from "react";
import { RegistroContext } from "../../Context";
import Cotizador from "../Cotizador";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button, Stack , Row, Container } from 'react-bootstrap';
import { apiPost } from "../../services/apiPetition";
import getLastUrl from "../../Utils/getLastUrl";

function EditModal({ regTarget }) {
    const {
      editRow,
      editModalIsOpen,
      setEditModalIsOpen,
      setNewToast,
      token ,
      erpStatus,
      isClientInErp,
      syncClientWithErp 
    } = useContext(RegistroContext);
    const [syncingErp, setSyncingErp] = useState(false);
    const clientIsInErp = isClientInErp(regTarget?.nit);

    const editPdf = (target) => {
      editRow(target.id , {pdf : 'load'} , 'pdf' , false);
      setEditModalIsOpen(false);

      const onSuccessHandler = data => {
        data = JSON.parse(data);
        editRow(target.id , {pdf : data.url} , 'none' , false)
        setNewToast({status : data.status , msj : `PDF de cotización de ${target.cliente}:\n${data.msj}`}) 
      };
      const onErrorHandler = error => {
        setNewToast({status : 'error' , msj : error})
      };

      apiPost(
        {type : 'createpdf' , docType : 'COTIZACION' , token : token} ,
        {id : target.id , data : {url : getLastUrl(target.docs)} } ,
        onSuccessHandler , onErrorHandler);
    };

    const updateDocs = (target) => {
      editRow(target.id , {docs : 'load'} , 'docs' , false);
      setEditModalIsOpen(false);
      
      const onSuccesHandler = data => {
        data = JSON.parse(data);
        editRow(target.id , {docs : data.url} , 'none' , false);       
        setNewToast({status : data.status , msj : `Docs de Cotización de ${target.cliente}: ${data.msj}`});
      };

      const onErrorHandler = error => {
        setNewToast({status : 'error' , msj : error})
      };
      
      apiPost(
        {type : 'updateDocs' , docType : 'COTIZACION' , token : token} ,
        {id : target.id , data : target } ,
        onSuccesHandler , onErrorHandler
      )
    };

    const syncWithErp = async () => {
      setSyncingErp(true);
      try {
        const createdThirdParty = await syncClientWithErp(regTarget);
        if (createdThirdParty) {
          setNewToast({
            status: 'success',
            msj: `${regTarget.cliente} se creó correctamente en el ERP.`
          });
        }
      } catch (error) {
        setNewToast({ status: 'Error', msj: error.message });
      } finally {
        setSyncingErp(false);
      }
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
                <Button
                  variant="outline-primary"
                  disabled={syncingErp || clientIsInErp || erpStatus !== 'connected'}
                  onClick={syncWithErp}
                  title={erpStatus === 'contingency' ? 'ERP en modo contingencia' : undefined}
                >
                  {syncingErp ? 'Sincronizando…' : clientIsInErp ? 'Ya está en ERP' : 'Sincronizar ERP'}
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