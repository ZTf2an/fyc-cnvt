import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { RegistroContext } from "../../Context";
import Searcher from "../../Components/Searcher";
import ModeSelector from "../../Components/ModeSelector";
import TableGestion from "../../Components/TableGestion";
import MosaicoGestion from "../../Components/MosaicoGestion";
import './Gestion.css'

function Gestion () {
    const {searchValue , setSearchValue , orderIcon , orderContition , ordenarFecha} = useContext(RegistroContext);
    const [itemsStyle , setItemsStyle] = useState('mosaico');

    return (
        <>
            <div className="mb-2 d-flex">
                <Searcher change={setSearchValue} searchValue={searchValue}/>
                <ModeSelector changeMode={setItemsStyle}/>
            </div>
            <div className="contenedor position-relative">
                {itemsStyle == 'mosaico' ? 
                    <>
                        <div className="position-fixed d-flex flex-column gap-2 top-10 end-0 mt-1 me-2em z-index-10">
                            <Button variant="outline-dark row" value={orderContition} onClick={ordenarFecha}>
                                Fecha{orderIcon}
                            </Button>
                            <Button variant="outline-dark row" value={orderContition} onClick={e=> window.location.href = '/personal'}>
                                Personal
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