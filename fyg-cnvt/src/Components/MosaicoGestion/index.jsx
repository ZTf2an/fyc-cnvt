import { useContext } from "react";
import CardGestion from "../CardGestion";
import { RegistroContext } from "../../Context";
import { Col, Container, Row } from "react-bootstrap";
import './MosaicoGestion.css'

function MosaicoGestion () {
    const {searchedData} = useContext(RegistroContext);

    return(
        <>
        <div className="cuadricula">
            {searchedData.map(
                card => (card.aceptado && card.active) && <CardGestion key={card.id} info={card} />
            )}
        </div>
        </>
    )
}
export default MosaicoGestion