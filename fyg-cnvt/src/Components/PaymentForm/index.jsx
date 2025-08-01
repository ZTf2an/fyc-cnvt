import { useContext, useState } from "react";
import { Form , Button, Toast, FloatingLabel } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { RegistroContext } from "../../Context";
import valoresSegunModalidad from "../../Utils/valoresSegunModalidad";

function PaymentForm () {
    const {registroToEdit , editRow} = useContext(RegistroContext);
    const [data , setData] = useState(JSON.parse(registroToEdit.pagosJson || '[]'));
    const [nuevoPagoIsOpen , setNuevoPagoIsOpen] = useState(false);

    const enviarPago = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newData = [...data];
        const newPay = {
            valor : e.target.valor.value,
            descripcion : e.target.descripcion.value
        };
        setNuevoPagoIsOpen(false);
        newData.push(newPay);
        setData(newData);
        editRow(registroToEdit.id , {pagosJson : JSON.stringify(newData)} , 'none' );
    };

    const pagoFaltante = (obj) => {
        const valorTotal = valoresSegunModalidad(obj);
        let totalPagado = 0;

        if (obj.pagosJson) {
            let pagos = JSON.parse(obj.pagosJson);
            //console.log(pagos)
            pagos.forEach(pago => {
                totalPagado += parseInt(pago.valor);
            });
        };

        const diferencia = (valorTotal*0.94) - totalPagado;
        return (<h4 className="m-2"><u>Falta por pagar $<strong>{diferencia.toLocaleString('es-CO')}</strong></u></h4>)
    };
    
    return (<>
            {pagoFaltante(registroToEdit)}

            {data.length === 0 ? 
                <p>{`No hay pagos anotados de ${registroToEdit.cliente}`}</p> : 
                // "hola"
                data.map((pago , i) => (<div key={i+1}>
                    <Toast className="m-2">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">PAGO {i+1}</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <p>Valor Pagado : ${parseInt(pago.valor).toLocaleString('es-CO')}</p>
                            <p>Descripcion : {pago.descripcion}</p>
                        </Toast.Body>
                    </Toast>
                </div>))
            }
            <Toast className=" m-2 p-1" show={nuevoPagoIsOpen}>
                <Form id="PaymentForm" onSubmit={enviarPago}>
                    <strong className="m-2">Anota Nuevo Pago</strong>
                    <FloatingLabel controlId="valor" label="Valor Pagado" className="mt-1">
                        <Form.Control type="number" placeholder="Ej : 100000" />
                    </FloatingLabel>
                    <FloatingLabel controlId="descripcion" label="Descripcion" className="mt-1">
                        <Form.Control as="textarea" placeholder="Escibe la descripcion" style={{ height: '100px' }}/>
                    </FloatingLabel>
                </Form>
                <div className="d-grid m-1">
                    <Button variant="outline-dark" type="submit" form="PaymentForm">Guardar Pago</Button>
                </div>
            </Toast>

            <Button className="m-3" variant='primary' size="lg" hidden={nuevoPagoIsOpen} onClick={e => setNuevoPagoIsOpen(true)}><FaPlus className="fs-3" /></Button>        
            
    </>)
};

export default PaymentForm;