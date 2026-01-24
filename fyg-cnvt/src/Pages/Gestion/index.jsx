import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { RegistroContext } from "../../Context";
import { RiFileExcel2Fill } from "react-icons/ri";
import Searcher from "../../Components/Searcher";
import ModeSelector from "../../Components/ModeSelector";
import TableGestion from "../../Components/TableGestion";
import MosaicoGestion from "../../Components/MosaicoGestion";
import './Gestion.css'
import generarExcel from "../../Utils/generateExcel";

function Gestion () {
    const {data , searchValue , setSearchValue , orderIcon , orderContition , ordenarFecha} = useContext(RegistroContext);
    const [itemsStyle , setItemsStyle] = useState('lista');

    return (
        <>
            <div className="mb-2 d-flex">
                <Searcher change={setSearchValue} searchValue={searchValue}/>
                <Button variant="success" className="my-2 ms-1" title="Descargar excel">
                    <RiFileExcel2Fill onClick={e=>confirm("Va a generar el excel de todos los aceptados")&&generarExcel(data.filter(i=>i.active && i.aceptado))}/>
                </Button>
                <ModeSelector changeMode={setItemsStyle}/>
            </div>
            <div className="contenedor position-relative">
                {itemsStyle == 'mosaico' ? 
                    <>
                        <div className="position-fixed top-10 end-0 mt-1 me-2em z-index-10">
                            <Button variant="outline-dark" value={orderContition} onClick={ordenarFecha}>
                                Fecha{orderIcon}
                            </Button>
                        </div>
                        <MosaicoGestion/>
                    </> : 
                    <TableGestion/>
                }
            </div>
        </>
    )
}
export default Gestion