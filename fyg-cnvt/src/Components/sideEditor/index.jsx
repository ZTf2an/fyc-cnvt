import { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RegistroContext } from '../../Context';
import EditorForm from '../EditorForm';

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
                    <div className='m-2'>
                        <Button variant="outline-danger" className='me-2'>Actualizar PDF</Button>
                        <Button variant="info" >Generar Cuenta de Cobro</Button>
                    </div>
            </Offcanvas>
        </>
    );
}

export default SideMenu
