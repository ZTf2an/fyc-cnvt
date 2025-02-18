import { useContext, useState } from "react"
import { Card, ListGroup, Spinner, Stack , Table } from "react-bootstrap";
import { BsFolderCheck, BsPlusCircleFill } from "react-icons/bs";
import { MdOutlineAddToDrive } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { GiVikingHelmet , GiSpartanHelmet , GiSamuraiHelmet, GiRobotHelmet, GiAmericanFootballHelmet} from "react-icons/gi";
import { API_CNVT, API_GAS } from "../../Globals/API";
import "./CardGestion.css"
import "../../Pages/Personal/personal.css"
import { CgTranscript } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";

function CardGestion ({info , editRow}) {
    const preFecha = new Date(info.fecha);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

    const [openedElement , setOpenedElement] = useState(0);

    const toggleElement = (i) => {
        return openedElement == i ? 0 : i 
    };

    const servicios =  JSON.parse(info.servicios);
    const logisticos = info.logsJson ? JSON.parse(info.logsJson) : [];

    const modalidadColor = {
        'P-tarjetas' : 'info',
        'P-Controles' : 'success',
        'P-Mixta' : 'warning',
        'Virtual' : 'primary',
    };

    const cargo = {
        liderSonido : { icon : <GiVikingHelmet className="fs-3 icon-viking" title="Lider de Sonido"/> , valor : 100000},
        liderVotacion : { icon : <GiSamuraiHelmet className="fs-3 icon-samurai" title="Lider de Votación"/>, valor : 120000},
        liderIntegral : { icon : <GiSpartanHelmet className="fs-3" title=" Lider Integral"/> , valor : 150000},
        liderVirtual : {icon :<GiRobotHelmet className="fs-3 icon-robot" title="Lider de Votación"/> , valor : 150000},
        logisticoVirtual : {icon : <FaRobot className="fs-3 icon-robot2" title="Logistico Virtual"/> , valor : 70000},
        logisticoBasico : {icon :<GiAmericanFootballHelmet className="fs-3 icon-american" title=" Logistico Basico"/> , valor : 70000},
        redactor : {icon :<CgTranscript className="fs-3 icon-actas" title="Redactor"/>, valor:150000},
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
                        <li>Dir : {info.direccion}</li>
                        <li>Tel : {info.tel}</li>
                        <li>Email : {info.email}</li>
                    </ul>
                </div>
            </ListGroup.Item>
            <ListGroup.Item hidden>
                Inventario
            </ListGroup.Item>
            <ListGroup.Item>
                <div className="cardItemTitle" onClick={e => setOpenedElement(toggleElement(3))}>Logisticos</div>
                <div hidden={openedElement != 3}>
                    <div className="position-relative">
                        <div className="position-absolute end-0">
                            <BsPlusCircleFill className="fs-2 text-warning"/>
                        </div>
                        {!info.logsJson && "No hay ningun logistico"} 
                        <table >
                            <tbody>
                                {logisticos.map(( logistico , i ) => (
                                    <tr key={i}>
                                        {/* <td>{i+1}</td> */}
                                        <td>{cargo[logistico.Cargo].icon}</td>
                                        <td className="fs-6">{logistico.nombre}</td>
                                        <td>${cargo[logistico.Cargo].valor.toLocaleString('es-CO')}</td>
                                        {/* <td><input type="checkbox"/></td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
                                    {servicios.acta.isRequired ?
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