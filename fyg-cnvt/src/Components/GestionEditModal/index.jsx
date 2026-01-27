import { useContext, useState } from 'react';
import { Modal , Form , Button, Row, Col , Container ,Stack} from 'react-bootstrap';
import { RegistroContext } from '../../Context';
import { parsedParams } from '../../useServerHooks/useCreate';
import formatedDate from '../../Utils/formatDate';
import { API_CNVT , API_GAS } from '../../Globals/API';
// import Modal from 'react-bootstrap/Modal';

function GestionEditModal () {
    const { registroToEdit , editGestionModalIsOpen , setEditGestionModalIsOpen , editRow} = useContext(RegistroContext);

    const handleClose = () => setEditGestionModalIsOpen(false);

    const guardarCambios = (e) => {
        e.preventDefault();
        
        let params = parsedParams(e.target);
        editRow(registroToEdit.id , params , 'lote');
    }; 

    const generarCertificado = (item) => {
        if (confirm("Va a generar el certificado de votaciones de "+item.cliente+".")) {
            fetch(API_CNVT+'/globals' , {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({url : `${API_GAS}?type=createCertVot` , body : {id : item.id , data : item}})
            })
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data);
                console.log(result);
                alert(result.msj);
            })
            .catch(err => alert(`Error : ${err}`))
        };
        setEditGestionModalIsOpen(false)
    };

    const validateCertVot = (obj) => {
        let msj = `Falta por agregar:\n`
        const bolean = (!!obj.modalidad && !!obj.nit && !!obj.fecha && !!obj.driveFolder && !!obj.remitenteCuenta);
        if (!obj.modalidad) msj += "- Modalidad\n";
        if (!obj.nit) {msj += "- Nit\n"};
        if (!obj.fecha) {msj += "- Fecha\n"};
        if (!obj.driveFolder) {msj += "- Carpeta de Drive\n"};
        if (!obj.remitenteCuenta) {msj += "- Remitente de cuenta de Cobro"};
        if (bolean) msj = "Es posible generar el certificado."
        
        return { 
            msj : msj ,
            isAbled : bolean
        }
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
                <Container fluid>
                    <Stack direction="horizontal" className="w-full" gap={3}>
                        { !validateCertVot(registroToEdit).isAbled ?
                            <Button 
                            variant="danger" 
                            type="button"
                            title={validateCertVot(registroToEdit).msj}
                            className="pointer"
                            onClick={e => alert(validateCertVot(registroToEdit).msj)}
                            > No Habilitado para Certificados.
                            </Button>:                           
                            <Button 
                            variant="outline-success" 
                            type="button"
                            title={validateCertVot(registroToEdit).msj}
                            className="pointer"
                            onClick={e => generarCertificado(registroToEdit)}
                            > Generar Certificado de Votaciones.
                            </Button>
                        }
                        <Button type="submit" form="GestionEditForm">Guardar Cambios</Button>
                    </Stack>
                </Container>
            </Modal.Footer>
        </Modal>);
}

export default GestionEditModal;