import { useState } from 'react';
import {Toast,} from 'react-bootstrap';

export function ToastAlerter ({msj = "Error no Controlado", status="default"}) {
    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);
    const type = {
        "error": {bg :"danger" , delay:10},
        "success" : {bg: "success",  delay: 2},
        "default" : {bg:"danger" , delay : 10}
    }

    return (
        <Toast 
            bg={type[status.toLowerCase()].bg} 
            show={show} 
            autohide={true}
            onClose={toggleShow}
            delay={type[status.toLowerCase()].delay * 1000}
        >
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{status}</strong>
                {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body style={{color : 'white'}}>{msj}</Toast.Body>
        </Toast>
    )
}