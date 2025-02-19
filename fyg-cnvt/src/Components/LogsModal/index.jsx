import { useState } from "react";
import { Modal , Button , Container , Form , Row , Col , Table, Stack} from "react-bootstrap";

function InputLogSelector ({addPerson}) {
    const [cargo , setCargo] = useState("");
    const [persona , setPersona] = useState("");

    return (<Row className="m-1">
        <Col sm="4">
            <Form.Select onChange={e => setCargo(e.target.value)}>
                <option>Selecciona Cargo</option>
                <option>Lider Integral</option>
                <option>Lider Votación</option>
                <option>Lider Virtual</option>
                <option>Lider Sonido</option>
                <option>Logistico</option>
                <option>Soporte</option>
            </Form.Select>
        </Col>
        <Col sm="7">
            <Form.Select onChange={e => setPersona(e.target.value)}>
                <option>Selecciona Persona</option>
                <option>Steffan Pardo</option>
            </Form.Select>
        </Col>
        <Col sm="1">
            <Button variant="outline-primary" onClick={ e => addPerson(cargo , persona)}>✔️</Button>
        </Col>
    </Row>);
};

function LogsModal () {
    const [personalAsamblea , setPersonalAsamblea] = useState([]);
    const [logSelectorShow , setLogSelectorShow] = useState(false);
    // console.log(personalAsamblea);

    const addPersonToList = (c , p) => {
        const newPersona = {cargo : c , persona : p};
        const newPersonal = [...personalAsamblea]
        newPersonal.push(newPersona);
        setPersonalAsamblea(newPersonal);
        setLogSelectorShow(false)
    };

    return (
        <Modal show={true} size="lg" centered>
            <Modal.Header closeButton>
                <h5 className="me-2">Edita Logisticos de:</h5>
                <h4>C.R. ESTA ES UNA PRUEBA</h4>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="mb-2" title="información">
                        <Col>Sugeridos : 0</Col>
                        <Col>Totales : 0</Col>
                        <Col>Valor : $0</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <div style={{maxWidth : "536px"}} className=" border rounded p-2">
                            <table>
                                <tbody>
                                {personalAsamblea && 
                                    personalAsamblea.map((persona , idx )=> <div key={idx}>Cargo : {persona.cargo} , Nombre : {persona.persona}</div>)
                                }
                                    <tr>
                                        <td>
                                            Lider de sonido
                                        </td>
                                        <td>
                                            Lider de sonido
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Row>
                    {personalAsamblea && 
                        personalAsamblea.map((persona , idx )=> <div key={idx}>Cargo : {persona.cargo} , Nombre : {persona.persona}</div>)
                    }
                    {logSelectorShow && <InputLogSelector addPerson={addPersonToList}/>}
                    {personalAsamblea.length == 0 && !logSelectorShow ? "Click en el Botón + para comenzar a anotar los logisticos" : ""}
                    <Row className="m-1">
                        <Button onClick={e => setLogSelectorShow(true)}>+</Button>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Cerrar</Button>
                <Button>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default LogsModal