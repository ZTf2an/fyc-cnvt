import { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RegistroContext } from '../../Context';

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
                Aqui irán todos los vainos
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SideMenu
