import { Button } from "react-bootstrap";
import { RegistroContext } from "../../Context";
import { useContext } from "react";

const ServerError = () => {
    const {fetchData} = useContext(RegistroContext)
  return (
    <div>
      <p className="text-center">{'No hay comunicacion con el servidor 😯'} <Button variant="outline-dark" onClick={e=>fetchData()}>Retry</Button></p>
      
    </div>
  );
};

export default ServerError;
