import { Accordion, Form, Row , Col } from "react-bootstrap";

const formatNumber = (input) => {
  if (isNaN(input)) {
      return ""
  } else {
      return input
  }
};

function ValoresAdicionales({ value, setValue }) {
  console.log(value.numeroControles)
  return (
    <div className="col-md-4 mb-3">
      <Accordion>
        <Accordion.Item eventKey="0" className="border-top-0 border-start-0 border-end-0">
          <Accordion.Header>Valores Adicionales</Accordion.Header>
          <Accordion.Body>
            <Form.Label>
              Valor de acompañamiento <strong>Virtual</strong>
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={value.valorExtraVirtual}
              name="inputValorAcoVirtual"
              onChange={(e) => setValue({...value , valorExtraVirtual:e.target.value})}
              required
              className="text-end"
            />

            <Form.Label>
              Valor adicional de transportes o viáticos <strong>Presencial</strong>
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={value.valorTransporte}
              name="inputValorAcoPresencial"
              onChange={(e) => setValue({...value , valorTransporte:e.target.value})}
              required
              className="text-end"
            />

            <Form.Label>
              <strong>Controles</strong>
            </Form.Label>
            <Form.Control 
              className="text-end"
              type="number"
              name="inputNumeroControles"
              value={formatNumber(value.numeroControles)}
              onChange={(e) => setValue({...value , numeroControles : e.target.value})}
              required
            />
            {/* <Form.Control
              type="number"
              value={value.valorExtraControles}
              name="inputValorControles"
              onChange={(e) => setValue({...value , valorExtraControles : e.target.value})}
              required
              className="text-end"
            /> */}

            {/* <Form.Label>
              Valor de acompañamiento <strong>Mixta</strong>
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={value.valorExtraMixta}
              name="inputValorAcoMixta"
              onChange={(e) => setValue({...value , valorExtraMixta : e.target.value})}
              className="text-end"
            /> */}
            
            <Form.Label>
            Equipos Adicionales <strong>Presencial</strong>
            </Form.Label>
            <Form.Control
              type="number"
              value={value.valorExtraEquipos}
              name="inputValorExtraEquipos"
              onChange={(e) => setValue({...value , valorExtraEquipos : e.target.value})}
              className="text-end"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ValoresAdicionales;