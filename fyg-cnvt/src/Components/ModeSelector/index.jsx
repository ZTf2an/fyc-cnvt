import { Button } from "react-bootstrap";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { FaList } from "react-icons/fa";

function ModeSelector({changeMode}) {
    return(
        <>
        <div className="d-flex gap-2 m-2">
            <Button variant="secondary" onClick={e => changeMode('mosaico')}>
                <MdAutoAwesomeMosaic />
            </Button>
            <Button variant="secondary" onClick={e => changeMode('lista')}>
                <FaList />
            </Button>
        </div>
        </>
    )
}
export default ModeSelector