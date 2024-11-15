import { useContext, useState } from "react";
import { RegistroContext } from "../../Context";
import Searcher from "../../Components/Searcher";
import ModeSelector from "../../Components/ModeSelector";
import TableGestion from "../../Components/TableGestion";
import MosaicoGestion from "../../Components/MosaicoGestion";
import './Gestion.css'

function Gestion () {
    const {searchValue , setSearchValue} = useContext(RegistroContext);
    const [itemsStyle , setItemsStyle] = useState('mosaico');

    return (
        <>
            <div className="mb-2 d-flex">
                <Searcher change={setSearchValue} searchValue={searchValue}/>
                <ModeSelector changeMode={setItemsStyle}/>
            </div>
            <div className="contenedor">
                {itemsStyle == 'mosaico' ? 
                    <MosaicoGestion/> : 
                    <TableGestion/>
                }
            </div>
        </>
    )
}
export default Gestion