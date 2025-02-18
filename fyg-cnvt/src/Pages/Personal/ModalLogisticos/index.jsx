import {Modal , Button} from "react-bootstrap";
import FormAddLogistico from "../FormAddLogistico";
import { enviarDataLogisticos } from "../../../useServerHooks/useLogisticos/create";

const selectType = {
    'add' : { 
        title : 'Agregar Logistico' , 
        formTitle : 'Agregar', 
        buttonText : 'Añadir' , 
        action : (e)=>{
            e.preventDefault();
            if(confirm('Está por enviar nuevo Logistico')){
                enviarDataLogisticos(e.target , 'addLog' , () => {
                    e.target.reset();
                });
            } else {
                return false;
            };
        }},
    'edit' : { 
        title : 'Editar Logistico' , 
        formTitle : 'editar', 
        buttonText : 'Guardar Cambios' , 
        action : ()=>{}},
};

function ModalLogisticos ({type , isOpen , hide}) {
    return (
        <Modal show={isOpen} onHide={hide} fullscreen="sm-down">
            <Modal.Header closeButton>
                <Modal.Title>{selectType[type].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <FormAddLogistico title={selectType[type].formTitle} submit={selectType[type].action}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={e=> hide()}>Close</Button>
                <Button variant="primary" type="submit" form={selectType[type].formTitle}>{selectType[type].buttonText}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalLogisticos;