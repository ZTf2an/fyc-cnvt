import { useContext, useState } from "react"
import { Card, ListGroup, Spinner, Stack , Table } from "react-bootstrap";
import { BsFolderCheck } from "react-icons/bs";
import { MdOutlineAddToDrive } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import "./CardGestion.css"
import { API_CNVT, API_GAS } from "../../Globals/API";

function CardGestion ({info , editRow}) {
    const preFecha = new Date(info.fecha);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

    const inventario = JSON.parse(info.servicios);

    const [openedElement , setOpenedElement] = useState(0);

    const toggleElement = (i) => {
        return openedElement == i ? 0 : i 
    };

    const modalidadColor = {
        'P-tarjetas' : 'info',
        'P-Controles' : 'success',
        'P-Mixta' : 'warning',
        'Virtual' : 'primary',
    };

    const crearCarpeta = (item) => {
        if (!item.driveFolder) {
            editRow(item.id , { driveFolder : 'load'} , 'createFolder' , false);
            fetch(API_CNVT+'/globals' , {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({url : `${API_GAS}?type=createFolder` , body : {id : item.id , data : item}})
            })
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data);
                console.log(result);
                alert(result.msj);
                editRow(item.id , {driveFolder : result.url} , 'none' , false);
            })
            .catch(err => alert(`Error : ${err}`))
        };
    };

    const sendMail = (item) => {
        const response = confirm('¿Está Seguro de que quiere enviar los informes de '+item.cliente+'?');
        if (response) {
            fetch(API_CNVT+'/globals' , {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({url : `${API_GAS}?type=sendMail&&docType=folder` , body : { data : item}})
            })
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data);
                console.log(result);
                alert(result.msj);
            })
            .catch(err => alert(`Error : ${err}`))
        };
        return response
    }

    return (<>
    <Card style={{ width: '18rem' , marginTop:'5px'}}>
        <Card.Body className="position-relative">
            <Card.Title>{info.cliente}</Card.Title>
            <div className="position-absolute d-flex gap-1 bottom-0 end-0 m-1">
                <div className={`mt-2 border border-2 border-${modalidadColor[info.modalidad]} rounded-pill text-wrap ps-1 pe-1`} style={{ height : '22px' , fontSize : '12px'}}>
                    {info.modalidad}
                </div>
                <div className={`border border-2 border-danger p-1 rounded-pill`}>
                    <strong>{info.predios}</strong>
                </div>
            </div>
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
                <div className="cardItemTitle" onClick={e => setOpenedElement(toggleElement(2))}>Inventario</div>
                <div hidden={openedElement != 2}>
                    { info.modalidad !== 'Virtual' ? <ul>
                        <li className={(inventario.sonido.cabinas <= 0 || !inventario.sonido.isRequired) && "text-decoration-line-through"}>
                            {inventario.sonido.cabinas} Cabinas
                        </li>
                        <li className={(inventario.sonido.microfonos <= 0 || !inventario.sonido.isRequired) && "text-decoration-line-through"}>
                            {inventario.sonido.microfonos} Microfonos
                        </li>
                        <li className={(!inventario.sonido.isRequired) && "text-decoration-line-through"}>
                            Consola / Amplificador
                        </li> 
                        <li className={(!inventario.filmacion.isRequired) && "text-decoration-line-through"}>
                            {inventario.filmacion && 1} Camara
                        </li>
                        <li className={(inventario.proyeccion.videobeam <= 0 || !inventario.proyeccion.isRequired) && "text-decoration-line-through"}>
                            {inventario.proyeccion.videobeam} Video Beam
                        </li>
                        <li className={(inventario.sonido.telon <= 0 || !inventario.proyeccion.isRequired) && "text-decoration-line-through"}>
                            {inventario.proyeccion.telon} Telón</li>
                        <li className={(inventario.votacion.logisticos <= 0 || !inventario.votacion.isRequired || info.modalidad !== 'P-tarjetas') && "text-decoration-line-through"}>
                            {inventario.votacion.logisticos} Lectores
                        </li>
                    </ul> : <p> - La asamblea es Virtual. No requiere equipo Alguno</p>}
                </div>
            </ListGroup.Item>
            <ListGroup.Item hidden>
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Acta</th>
                                <th colSpan={2}>
                                    {inventario.acta.isRequired ?
                                        'Requerido' :
                                        'No Requerido'
                                    }
                                </th>
                            </tr>
                            <tr>
                            <th>Carpeta</th>
                                <th>
                                    <div className="d-flex justify-content-center fs-4">
                                        {!info.driveFolder ? 
                                            <MdOutlineAddToDrive 
                                            className="generateFolder-icon pointer" 
                                            title="Click para Crear Carpeta"
                                            onClick={e => crearCarpeta(info)}
                                            /> :
                                            info.driveFolder == 'load' ?
                                            <Spinner animation="border" variant="secondary">
                                                    <span className="visually-hidden">Loading...</span>
                                            </Spinner> :
                                            <a href={info.driveFolder} target="_blank">
                                                <BsFolderCheck className="folder-icon pointer"/>
                                            </a>
                                        }
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-center fs-5 pointer">
                                        {(info.driveFolder && info.driveFolder != 'load') ? 
                                            <HiOutlineMail 
                                                className={`fs-3 mx-1 icon-msg pointer`}  
                                                title={"Enviar link al cliente"}
                                                onClick={ e => sendMail(info , 'folder')}
                                            />
                                            :
                                            <HiOutlineMail 
                                                className={`fs-3 mx-1 icon-disabled`}  
                                                title={"No es posible enviar la carpeta porque no hay link"}
                                            />
                                        }
                                        
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>Duración</th>
                                <th colSpan="2">
                                    <div className="d-flex justify-content-center">
                                        {info.duracion && info.duracion+'h'}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Stack direction="horizontal" gap={3}>
                <div className="me-auto">{fecha.toLocaleDateString('es-ES', {month : 'short' , day :'numeric' })}</div>
                <input type="color" defaultValue={'#FFFFFF'}/>
            </Stack>
        </Card.Body>
    </Card>
    </>)
}

export default CardGestion