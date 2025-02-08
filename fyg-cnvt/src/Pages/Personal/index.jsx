import { Table , InputGroup , Form , Button, Modal} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import ModalLogisticos from "./ModalLogisticos";
import { useState } from "react";
import { getData } from "../../useServerHooks/useLogisticos/read";
function Personal (){
    const [modalLogisticosIsOpen , setModalLogisticosIsOpen] = useState(false);
    const [dataLoading , setDataLoading] = useState(false);
    const [logisticosData , setLogisticosData] = useState([]) ;
    
    //En proyecto
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
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Localidad</th>
                        <th hidden>Habilidades</th>
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
                                <td hidden>{item.poderes}</td>
                                <td>{item.categoria}</td>
                                <td>{item.fechaRetiro}</td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </Table>
            {dataLoading ? "Cargando Datos...": logisticosData.length == 0 && "Click en Botón Actualizar para Cargar los datos" }
            <ModalLogisticos type={'add'} isOpen={modalLogisticosIsOpen} hide={() => setModalLogisticosIsOpen(false)}/>
        </div>
    )
}

export default Personal