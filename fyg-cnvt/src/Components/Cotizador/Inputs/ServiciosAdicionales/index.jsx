import ActaSetting from "./ActaSetting"
import CircuitoSetting from "./CircuitoSetting"
import FilmacionSetting from "./FilmacionSetting"
import ProyeccionSetting from "./ProyeccionSetting"
import SonidoSetting from "./SonidoSetting"
import VotacionSetting from "./VotacionSetting"

function ServiciosAdicionales ({value}) {
    let object = {};
    if (value != undefined) {
        object = JSON.parse(value)
    }
    return (
        <div className="col-md-8 mb-3">
            <div className="accordion">
                <div className="accordion-item border-top-0 border-start-0 border-end-0">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Servicios Adicionales
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="row g-3">
                                <ActaSetting value={object?.acta?.isRequired}/>
                                <SonidoSetting value={object?.sonido}/>
                                <VotacionSetting value={object?.votacion}/>
                                <FilmacionSetting value={object?.filmacion?.isRequired}/>
                                <ProyeccionSetting value={object?.proyeccion}/>
                                <CircuitoSetting value={object?.cctv}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiciosAdicionales