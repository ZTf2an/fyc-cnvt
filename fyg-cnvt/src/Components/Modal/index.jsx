import { useState , useContext} from "react"
import { RegistroContext } from "../../Context";
// import React, { useState } from "react";
import { Modal, Button, Container, Stack, Form } from "react-bootstrap";
// import Form from "react-bootstrap/Form"
// import Stack from "react-bootstrap/Stack"
// import Container from "react-bootstrap/Container"
import Cotizador from "../Cotizador"
// import Modal from "react-bootstrap/Modal"

function RegistroModal () {
    const { registroModalIsOpen , setRegistroModalIsOpen } = useContext(RegistroContext);
    const [enviarIsChecked, setEnviarIsChecked] = useState(false);
    const [buttonIsDisabled , setButtonIsDisabled] = useState(false);

    return (
        <Modal
            show={registroModalIsOpen}
            onHide={e=>setRegistroModalIsOpen(false)}
            fullscreen
            aria-labelledby="registroModal"
            >
        <Modal.Header closeButton>
          <Modal.Title>Registro Cotizador</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Cotizador
          formName={"crearRegistro"}
          disableButton={setButtonIsDisabled}
          sendMail={enviarIsChecked}
          changes={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <Container>
            <Stack direction="horizontal" gap={3}>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Enviar Cotización al Correo del Cliente"
                  checked={enviarIsChecked}
                  onChange={() => setEnviarIsChecked(!enviarIsChecked)}
                />
              </div>
              <div className="ms-auto">
                <Button variant="secondary" onClick={e => setRegistroModalIsOpen(false)} className="me-2">
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  form="crearRegistro"
                  disabled={buttonIsDisabled}
                  >
                  {enviarIsChecked ? "Enviar Cotización" : "Crear Registro"}
                </Button>
              </div>
            </Stack>
          </Container>
        </Modal.Footer>
      </Modal>
                            
    )
}

export default RegistroModal

// <div className="modal" id="registroModal" tabIndex="-1" aria-labelledby="registroModal" aria-hidden="true">
        //     <div className="modal-dialog modal-fullscreen">
        //         <div className="modal-content">
        //         <div className="modal-header">
        //             <h5 className="modal-title">Registro Cotizador</h5>
        //             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //         </div>
        //         <div className="modal-body">
        //             <Cotizador formName={"crearRegistro"} disableButton={setButtonIsDisabled} sendMail={enviarIsChecked} changes={true}/>
        //         </div>
        //         <div className="modal-footer">
        //             <Container>
        //                 <Stack direction="horizontal" gap={3}>
        //                     <div >
        //                         <Form.Check 
        //                             type={"checkbox"}
        //                             label={"Enviar Cotizacion al Correo del Cliente"}
        //                             checked={enviarIsChecked}
        //                             onChange={e => setEnviarIsChecked(!enviarIsChecked)}
        //                         />
        //                     </div>
        //                     <div className="ms-auto">
        //                         <button type="button" className="btn btn-secondary me-2 " data-bs-dismiss="modal">Close</button>
        //                         <button type="submit" className="btn btn-primary" form="crearRegistro" disabled={buttonisDisabled}>
        //                             {enviarIsChecked ? "Enviar Cotización" : "Crear Registro"}
        //                         </button> 
        //                     </div>
        //                 </Stack>
        //             </Container>
        //         </div>
        //         </div>
        //     </div>
        // </div>