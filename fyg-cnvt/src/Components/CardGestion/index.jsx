import { useState } from "react"
import { Card, ListGroup, Stack } from "react-bootstrap";
import "./CardGestion.css"

function CardGestion ({info}) {
    const preFecha = new Date(info.fecha);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

    const [openedElement , setOpenedElement] = useState(0);

    const toggleElement = (i) => {
        return openedElement == i ? 0 : i 
    };

    return (<>
    <Card style={{ width: '18rem' , marginTop:'5px'}}>
        <Card.Body>
            <Card.Title>{info.cliente}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <div className="cardItemTitle" onClick={e => setOpenedElement(toggleElement(1))}>Informacion</div> 
                <div hidden={openedElement != 1}>
                    <ul >
                        <li>Predios : {info.predios}</li>
                        <li>Nit : {info.nit}</li>
                        <li>Dir : {info.dir}</li>
                        <li>Tel : {info.tel}</li>
                        <li>Email : {info.email}</li>
                    </ul>
                </div>
            </ListGroup.Item>
            <ListGroup.Item>
                Inventario
            </ListGroup.Item>
            <ListGroup.Item>
                <div className="cardItemTitle" onClick={e => setOpenedElement(toggleElement(3))}>Logisticos</div>
                <div hidden={openedElement != 3}>
                    <ol>
                        <li>camilo</li>
                        <li>pepe</li>
                        <li>grillo</li>
                    </ol>
                </div>
            </ListGroup.Item>
            <ListGroup.Item>
                <div className="cardItemTitle" onClick={e => setOpenedElement(toggleElement(4))}>Informes</div>
                <div hidden={openedElement != 4}>
                    <ul>
                        <li>Acta</li>
                        <li>Carpeta</li>
                        <li>Duración</li>
                    </ul>
                </div>
            </ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Stack direction="horizontal" gap={3}>
                <div className="me-auto">{fecha.toLocaleDateString('es-ES', {month : 'short' , day :'numeric' })}</div>
                <input type="color"/>
            </Stack>
        </Card.Body>
    </Card>
    </>)
}

export default CardGestion