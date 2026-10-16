import { useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RegistroContext } from '../../Context';
import EditorForm from '../EditorForm';
import { API_CNVT, API_GAS } from '../../Globals/API';
import generarCuenta from '../../useServerHooks/useCuentaDeCobro/useGenerateCuenta';
import PaymentForm from '../PaymentForm';
import { apiPost } from '../../services/apiPetition';
import getLastUrl from '../../Utils/getLastUrl';

function SideMenu() {
    const { editSideIsOpen ,
        setEditSideIsOpen ,
        editSideType ,
        setNewToast ,
        registroToEdit ,
        editRow } = useContext(RegistroContext);

    const handleClose = () => setEditSideIsOpen(false);
    // const handleShow = () => setEditSideIsOpen(true);

    const generarpdf = (target) => {
        const response = confirm(`Está por generar PDF de ${target.cliente}`);
        
        if (response) {
            editRow(target.id , {pdfCuenta : 'load'} , 'none' , false);
            
            const onSuccesHandler = data => {
                const results = JSON.parse(data);
                editRow(target.id , {pdfCuenta : results.url} , 'none' , false);
                setNewToast({status : results.status , msj : `PDF de Cuenta de ${target.cliente}:\n${results.msj}`});
            };

            const onErrorHandler = error => {
                setNewToast({status : 'error' , msj : error});
            };

            apiPost(
                {type : 'createpdf' , docType : 'CUENTA'} , 
                {id : target.id , data : {url : getLastUrl(target.docsCuenta)} } ,
                onSuccesHandler , onErrorHandler
            );
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
                            <Button variant="outline-info" className='me-auto' title='Generar Cuenta de Cobro' onClick={e => generarCuenta(registroToEdit , editRow , setNewToast ,handleClose)}>Generar Cuenta</Button>
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
