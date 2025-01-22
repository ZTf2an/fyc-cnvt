import { Table , InputGroup , Form , Button} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Searcher from "../../Components/Searcher";
function Personal (){
    let logisticosData ;
    
    //En proyecto

    /*
        fetch(API_CNVT+'/globals' , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({url : `${API_GAS}?type=personal`})
        })
        .then(response => response.json())
        .then(data => {
            logisticosData = JSON.parse(data);
        })
        .catch(err => alert(`Error : ${err}`));
    */
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="Buscador"><FaSearch /></InputGroup.Text>
                <Form.Control
                placeholder="Buscar..."
                aria-label="Buscador"
                aria-describedby="Buscador"
                />
                <Button variant="primary" id="button-addon2">
                    Agregar
                </Button>
            </InputGroup>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Habilidades</th>
                        <th>Eventos Asistidos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Steffan Pardo</td>
                        <td>3003631311</td>
                        <td>lider Integral, lider Votación , lider Sonido, logistico, Redactor </td>
                        <td>340</td>
                        <td>🖋️🧻</td>
                    </tr>
                    {/* {logisticosData.map((item , i) => {
                        return (
                            <tr key={i}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>{item.fechaIngreso}</td>
                                <td>{item.fechaRetiro}</td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </Table>
        </div>
    )
}

export default Personal