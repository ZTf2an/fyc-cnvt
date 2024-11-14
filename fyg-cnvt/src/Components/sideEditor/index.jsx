import { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RegistroContext } from '../../Context';
import EditorForm from '../EditorForm';
import { parsedParams } from '../../useServerHooks/useCreate';

function SideMenu() {
    const{editSideIsOpen , setEditSideIsOpen} = useContext(RegistroContext);
    // const [show, setShow] = useState(false);

    const handleClose = () => setEditSideIsOpen(false);
    // const handleShow = () => setEditSideIsOpen(true);

    return (
        <>
            <Offcanvas show={editSideIsOpen} onHide={handleClose} placement={'end'} style={{width : '600px'}} >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edita el Registro</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditorForm/>
                </Offcanvas.Body>
                    <div className='m-2 hstack gap-3'>
                            <Button variant="outline-danger">Actualizar PDF</Button>
                            <Button variant="outline-info" className='me-auto' title='Generar Cuenta de Cobro'>Generar Cuenta</Button>
                            <Button variant="info" type='submit' form='CobranzaEditor'>Guardar Cambios</Button>
                    </div>
            </Offcanvas>
        </>
    );
}

export default SideMenu
