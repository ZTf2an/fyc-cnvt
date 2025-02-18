import { Table , InputGroup , Form , Button} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import ModalLogisticos from "./ModalLogisticos";
import { useState } from "react";
import { getData } from "../../useServerHooks/useLogisticos/read";
import iconoHabilidad from "./iconoHabilidad";
import './personal.css'

function Personal (){
    const [modalLogisticosIsOpen , setModalLogisticosIsOpen] = useState(false);
    const [dataLoading , setDataLoading] = useState(false);
    const [logisticosData , setLogisticosData] = useState([]) ;
    
    const actualizarData = () => {
        setDataLoading(true);         
        getData((r)=> {
            setLogisticosData(r);
            setDataLoading(false);
        });
    };

    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="Buscador"><FaSearch /></InputGroup.Text>
                <Form.Control
                placeholder="Buscar..."
                aria-label="Buscador"
                aria-describedby="Buscador"
                />
                <Button variant="secondary" id="button-addon2" title="Actualizar Datos" onClick={actualizarData}>
                    <TfiReload className="fs-4"/>
                </Button>
                <Button variant="primary" id="button-addon2" onClick={e => setModalLogisticosIsOpen(true)}>
                    Agregar
                </Button>
            </InputGroup>
            <div className="me-7">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Localidad</th>
                            <th>Habilidades</th>
                            <th hidden>Eventos Asistidos</th>
                            <th>Antiguedad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logisticosData.map((item , i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.nombre}</td>
                                    <td>{item.celular}</td>
                                    <td>{item.localidad}</td>
                                    <td>{
                                        JSON.parse(item.poderes).map((habilidad , idx)=> iconoHabilidad[habilidad]({key : idx,size:4}))
                                    }</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.fechaRetiro}</td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            {dataLoading ? "Cargando Datos...": logisticosData.length == 0 && "Click en Botón Actualizar para Cargar los datos" }
            <ModalLogisticos type={'add'} isOpen={modalLogisticosIsOpen} hide={() => setModalLogisticosIsOpen(false)}/>
        </div>
    )
}

export default Personal