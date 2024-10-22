import { useState } from 'react'
import {Form} from 'react-bootstrap'
import { RegistroContext } from '../../Context'
function EditorForm () {
    const {registroToEdit} = useState(RegistroContext);
    console.log(registroToEdit);
    return (
        <Form>
            <Form.Group className='mb-3' controlId='cliente'>
                <Form.Label>Cliente</Form.Label>
                <Form.Control type="text" placeholder="C.R Cliente"/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='nit'>
                <Form.Label>Nit</Form.Label>
                <Form.Control type="text" placeholder="Ej : 123456789" />
            </Form.Group>
            <Form.Group className='mb-3' controlId='fecha'>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date"/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorP'>
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" placeholder="500000" />
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorAcomVirtual'>
                <Form.Label>Valor de Acompañamiento Virtual</Form.Label>
                <Form.Control type="text" placeholder="500000" />
            </Form.Group>
            <Form.Group className='mb-3' controlId='valorAcomVirtual'>
                <Form.Label>Valor Presencial</Form.Label>
                <Form.Control type="text" placeholder="500000" />
            </Form.Group>
        </Form>
    )
}

export default EditorForm