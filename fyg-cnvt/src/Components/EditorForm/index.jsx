import { useContext } from 'react'
import {Form} from 'react-bootstrap'
import { RegistroContext } from '../../Context'
import { parsedParams } from '../../useServerHooks/useCreate';
import formatedDate from '../../Utils/formatDate';

function EditorForm ({reg , editRow}) {

    const guardarCambios = (e) => {
        e.preventDefault();

        let params = parsedParams(e.target);
        editRow(reg.id , params , 'lote' );
        // console.log(params)
    };

    return (
        <Form id='CobranzaEditor' onSubmit={guardarCambios}>
            <Form.Group className='mb-3' controlId='cliente'>
                <Form.Label>Cliente</Form.Label>
                <Form.Control type="text" name='cliente' placeholder="C.R Cliente" defaultValue={reg.cliente}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nit'>
                <Form.Label>Nit</Form.Label>
                <Form.Control type="text" name='nit' placeholder="Ej : 123456789" defaultValue={reg.nit}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='fecha'>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name='fecha' defaultValue={formatedDate(reg.fecha)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name='email' placeholder="name@example.com" defaultValue={reg.email}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorP'>
                <Form.Label>Valor Presencial con tarjetas</Form.Label>
                <Form.Control type="text" name='valorP' placeholder="500000" defaultValue={reg.valorP}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorPC'>
                <Form.Label>Valor Presencial con Controles</Form.Label>
                <Form.Control type="text" name='valorPC' placeholder="500000" defaultValue={reg.valorPC}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorV'>
                <Form.Label>Valor Virtual</Form.Label>
                <Form.Control type="number" name='valorV' placeholder="500000" defaultValue={reg.valorV}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorM'>
                <Form.Label>Valor Mixta</Form.Label>
                <Form.Control type="text" name='valorM' placeholder="500000" defaultValue={reg.valorM}/>
            </Form.Group>
        </Form>
    )
}

export default EditorForm