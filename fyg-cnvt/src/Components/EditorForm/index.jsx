import { useContext } from 'react'
import {Form} from 'react-bootstrap'
import { RegistroContext } from '../../Context'
import { parsedParams } from '../../useServerHooks/useCreate';
import formatedDate from '../../Utils/formatDate';

function EditorForm ({reg , editRow}) {

    const guardarCambios = (e) => {
        e.preventDefault();

        let params = parsedParams(e.target);
        editRow(reg.id , params , 'lote' , false);
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
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" name='valorP' placeholder="500000" defaultValue={reg.valorP}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorAcomVirtual'>
                <Form.Label>Valor de Acompañamiento Virtual</Form.Label>
                <Form.Control type="text" name='valorAcomVirtual' placeholder="500000" defaultValue={reg.valorAcomVirtual}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorAdicPresencial'>
                <Form.Label>Valor Presencial</Form.Label>
                <Form.Control type="text" name='valorAdicPresencial' placeholder="500000" defaultValue={reg.valorAdicPresencial}/>
            </Form.Group>
        </Form>
    )
}

export default EditorForm