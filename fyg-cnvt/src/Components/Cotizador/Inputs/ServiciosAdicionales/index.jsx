import { Accordion } from "react-bootstrap";
import ActaSetting from "./ActaSetting"
import CircuitoSetting from "./CircuitoSetting"
import FilmacionSetting from "./FilmacionSetting"
import ProyeccionSetting from "./ProyeccionSetting"
import SonidoSetting from "./SonidoSetting"
import VotacionSetting from "./VotacionSetting"

function ServiciosAdicionales ({value , setValue}) {
    // let object = {};
    // if (value != undefined) {
    //     object = JSON.parse(value)
    // };
    // console.log(value)
    const setChangesToValue = (changes) => {
        let newObj = {...value , ...changes};
        setValue(newObj);
    };

    return (
        <div className="col-md-8 mb-3">
            <Accordion>
                <Accordion.Item
                eventKey="0"
                className="border-top-0 border-start-0 border-end-0"
                >
                <Accordion.Header>Servicios Adicionales</Accordion.Header>
                <Accordion.Body>
                    <div className="row g-3">
                    <ActaSetting value={value?.acta?.isRequired} setValue={setChangesToValue}/>
                    <SonidoSetting value={value?.sonido} setValue={setChangesToValue}/>
                    <VotacionSetting value={value?.votacion} setValue={setChangesToValue}/>
                    <FilmacionSetting value={value?.filmacion} setValue={setChangesToValue}/>
                    <ProyeccionSetting value={value?.proyeccion} setValue={setChangesToValue}/>
                    <CircuitoSetting value={value?.cctv} setValue={setChangesToValue}/>
                    </div>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

    )
}

export default ServiciosAdicionales