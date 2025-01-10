import { useState } from "react"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"
import Container from "react-bootstrap/Container"
import Cotizador from "../Cotizador"

function Modal () {
    const [enviarIsChecked, setEnviarIsChecked] = useState(true);
    const [buttonisDisabled , setButtonIsDisabled] = useState(false);

    return (
        <div className="modal" id="registroModal" tabIndex="-1" aria-labelledby="registroModal" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Registro Cotizador</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Cotizador formName={"crearRegistro"} disableButton={setButtonIsDisabled} sendMail={enviarIsChecked}/>
                </div>
                <div className="modal-footer">
                    <Container>
                        <Stack direction="horizontal" gap={3}>
                            <div >
                                <Form.Check 
                                    type={"checkbox"}
                                    label={"Enviar Cotizacion al Correo del Cliente"}
                                    checked={enviarIsChecked}
                                    onChange={e => setEnviarIsChecked(!enviarIsChecked)}
                                />
                            </div>
                            <div className="ms-auto">
                                <button type="button" className="btn btn-secondary me-2 " data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" form="crearRegistro" disabled={buttonisDisabled}>
                                    {enviarIsChecked ? "Enviar Cotización" : "Crear Registro"}
                                </button> 
                            </div>
                        </Stack>
                    </Container>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal