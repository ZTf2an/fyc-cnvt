import { useContext, useState } from 'react';
import { Modal , Form , Button, Row, Col } from 'react-bootstrap';
import { RegistroContext } from '../../Context';
import { parsedParams } from '../../useServerHooks/useCreate';
import formatedDate from '../../Utils/formatDate';
// import Modal from 'react-bootstrap/Modal';

function GestionEditModal () {
    const { registroToEdit , editGestionModalIsOpen , setEditGestionModalIsOpen , editRow} = useContext(RegistroContext);

    const handleClose = () => setEditGestionModalIsOpen(false);

    const guardarCambios = (e) => {
        e.preventDefault();
        
        let params = parsedParams(e.target);
        editRow(registroToEdit.id , params , 'lote');
    }; 

    return (<Modal show={editGestionModalIsOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar datos del Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="GestionEditForm" onSubmit={guardarCambios}>
                    <Form.Group className="mb-3" controlId="cliente">
                        <Form.Label>Nombre del Cliente</Form.Label>
                        <Form.Control type="text" name="cliente" placeholder="Nombre del Cliente" defaultValue={registroToEdit.cliente}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email' placeholder="nombre@gmail.com" defaultValue={registroToEdit.email} />
                    </Form.Group>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="direccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" name="direccion" placeholder="ej: calle 174 #8 - 30" defaultValue={registroToEdit.direccion}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" name="fecha" placeholder="01/01*2025" defaultValue={formatedDate(registroToEdit.fecha)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="tel">
                                <Form.Label>Tel</Form.Label>
                                <Form.Control type="tel" name="tel" placeholder="ej: 3001234567" defaultValue={registroToEdit.tel}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="predios">
                                <Form.Label>Predios</Form.Label>
                                <Form.Control type="number" name="predios" placeholder="ej: 100" defaultValue={registroToEdit.predios}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="Notas">
                        <Form.Label>Notas</Form.Label>
                        <Form.Control  as="textarea" name="notas" type="text" placeholder="Escriba Aqui..." defaultValue={registroToEdit.notas}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="GestionEditForm">Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>);
}

export default GestionEditModal;