import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function FormAddLogistico ({title , submit}) {
    const [lI , setLI] = useState(false);
    const [lV , setLV] = useState(false);
    const [lS , setLS] = useState(false);
    const [lB , setLB] = useState(false);
    const [rA , setRA] = useState(false);
    const [categoria , setCategoria] = useState('');
    const [poderes , setPoderes] = useState([]);

    const valorPoderes = (liderI , liderV , liderS , logB , redactor) => {
        const arrayPoderes = [];
        
        if (liderI) arrayPoderes.push('Lider Integral');
        if (liderV) arrayPoderes.push('Lider Votación');
        if (liderS) arrayPoderes.push('Lider Sonido');
        if (logB) arrayPoderes.push('Logistico Basico');
        if (redactor) arrayPoderes.push('Redactor Actas');

        return arrayPoderes
    };

    useEffect(()=>{
        setPoderes(valorPoderes(lI , lV , lS , lB , rA))
    },[lI , lV , lS , lB , rA]);

    return (
        <Form id={title} onSubmit={submit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" placeholder="Pepito" required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name="apellido" placeholder="Perez" required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="edad">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control type="number" name="edad" placeholder="25" required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Label>Documento</Form.Label>
                        <Form.Control type="number" name="id" placeholder="1018486039" required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" name="celular" placeholder="3001234567" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="eps">
                        <Form.Label>EPS</Form.Label>
                        <Form.Control type="text" name="eps" placeholder="famisanar" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="localidad">
                        <Form.Label>Localidad</Form.Label>
                        <Form.Control type="text" name="localidad" placeholder="Suba" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Nuevo / Antiguo</h5>
                    <Form.Check type="radio" name="categoria" label="Nuevo" value={categoria} onClick={e => setCategoria('Nuevo')}/>
                    <Form.Check type="radio" name="categoria" label="Antiguo" value={categoria} onClick={e => setCategoria('Antiguo')}/>
                </Col>
                <Col>
                    <h5>Habilidades</h5>
                    <Form.Check type="checkbox" label="Lider Integral" checked={lI} onChange={e => setLI(!lI)}/>
                    <Form.Check type="checkbox" label="Lider Votación" checked={lV} onChange={e => setLV(!lV)}/>
                    <Form.Check type="checkbox" label="Lider Sonido" checked={lS} onChange={e => setLS(!lS)}/>
                    <Form.Check type="checkbox" label="Logistico Basico" checked={lB} onChange={e => setLB(!lB)}/>
                    <Form.Check type="checkbox" label="Redactor de Actas" checked={rA} onChange={e => setRA(!rA)}/>
                    <Form.Control type="text" name="poderes" value={JSON.stringify(poderes)} onChange={e=>e} disabled />
                </Col>
            </Row>
        </Form>
    );
};

export default FormAddLogistico;