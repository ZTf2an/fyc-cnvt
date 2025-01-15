import { useState , useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RegistroContext } from '../../Context';
import EditorForm from '../EditorForm';
import { parsedParams } from '../../useServerHooks/useCreate';
import { API_CNVT, API_GAS } from '../../Globals/API';
import generarCuenta from '../../useServerHooks/useCuentaDeCobro/useGenerateCuenta';

function SideMenu() {
    const{editSideIsOpen , setEditSideIsOpen} = useContext(RegistroContext);
    const {registroToEdit , editRow } = useContext(RegistroContext);

    const handleClose = () => setEditSideIsOpen(false);
    // const handleShow = () => setEditSideIsOpen(true);

    const generarpdf = (target) => {
        const response = confirm(`Está por generar PDF de ${target.cliente}`);
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
            <Offcanvas show={editSideIsOpen} onHide={handleClose} placement={'end'} style={{width : '600px'}} >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edita el Registro</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditorForm reg={registroToEdit} editRow={editRow}/>
                </Offcanvas.Body>
                    <div className='m-2 hstack gap-3'>
                            <Button variant="outline-danger" hidden={!registroToEdit.docsCuenta} onClick={e => generarpdf(registroToEdit)}>Actualizar PDF</Button>
                            <Button variant="outline-info" className='me-auto' title='Generar Cuenta de Cobro' onClick={e => generarCuenta(registroToEdit , editRow , handleClose)}>Generar Cuenta</Button>
                            <Button variant="info" type='submit' form='CobranzaEditor'>Guardar Cambios</Button>
                    </div>
            </Offcanvas>
        </>
    );
}

export default SideMenu
