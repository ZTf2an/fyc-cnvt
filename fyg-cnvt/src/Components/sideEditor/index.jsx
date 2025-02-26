import { useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RegistroContext } from '../../Context';
import EditorForm from '../EditorForm';
import { API_CNVT, API_GAS } from '../../Globals/API';
import generarCuenta from '../../useServerHooks/useCuentaDeCobro/useGenerateCuenta';
import PaymentForm from '../PaymentForm';

function SideMenu() {
    const{editSideIsOpen , setEditSideIsOpen , editSideType } = useContext(RegistroContext);
    const {registroToEdit , editRow } = useContext(RegistroContext);

    const handleClose = () => setEditSideIsOpen(false);
    // const handleShow = () => setEditSideIsOpen(true);

    const generarpdf = (target) => {
        const response = confirm(`Está por generar PDF de ${target.cliente}`);
        console.log(JSON.stringify({
            url :`${API_GAS}?type=createpdf&docType=CUENTA`, 
            body : {id : target.id , data : {url : target.docsCuenta} }
        }))
        if (response) {
            editRow(target.id , {pdfCuenta : 'load'} , 'none' , false);
            fetch(`${API_CNVT}/globals` , {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                    },
                body : JSON.stringify({
                    url :`${API_GAS}?type=createpdf&docType=CUENTA`, 
                    body : {id : target.id , data : {url : target.docsCuenta} }
                })
            })
            .then( response => response.json()) 
            .then( data => {
                const results = JSON.parse(data);
                editRow(target.id , {pdfCuenta : results.url} , 'none' , false);
                alert(results.msj);
            })
            .catch(e => alert(e));
            handleClose();
        } else {
            handleClose();
        }
    };

    return (
        <>
            <Offcanvas show={editSideIsOpen} onHide={handleClose} placement={'end'} style={{width : `${editSideType == 'Form' ? "600px" : "400px"}`}} >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    {editSideType == 'Form' ?
                         "Edita el Registro" :
                         "Anota los Pagos"
                    }
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {editSideType == 'Form' ? 
                        <EditorForm reg={registroToEdit} editRow={editRow}/> : 
                        <PaymentForm />
                    }
                </Offcanvas.Body>
                    {editSideType == 'Form' ?
                        <div className='m-2 hstack gap-3'>
                            <Button variant="outline-danger" hidden={!registroToEdit.docsCuenta} onClick={e => generarpdf(registroToEdit)}>Actualizar PDF</Button>
                            <Button variant="outline-info" className='me-auto' title='Generar Cuenta de Cobro' onClick={e => generarCuenta(registroToEdit , editRow , handleClose)}>Generar Cuenta</Button>
                            <Button variant="info" type='submit' form='CobranzaEditor'>Guardar Cambios</Button>
                        </div> :
                        <div className='m-2 hstack gap-3' hidden={true}>
                            <Button variant="info" type='submit' form='PaymentForm'>Guardar Cambios</Button>
                        </div>
                        
                    }
            </Offcanvas>
        </>
    );
}

export default SideMenu;
