import { createContext, useEffect, useState } from "react";

export const RegistroContext = createContext();

export const RegistroProvider= ({children}) => {

    const [data , setdata] = useState([
        {
          id: 6012421,
          cliente: 'C.R. BOCHICA COMPARTIR ',
          nit: '123456789',
          fecha: '2024-09-07T04:00:00.000Z',
          predios: '500',
          email: 'steffan.pardorios@gmail.com',
          tel: '3003631311',
          modalidadP: true,
          modalidadPC: true,
          modalidadV: true,
          modalidadM: true,
          valorP: '100000',
          valorPC: '100000',
          valorV: '100000',
          valorM: '100000',
          enviado: '100000',
          pdf: 'https://docs.google.com/spreadsheets/d/131UVGTKkb4jcRRUUe4j6LSMgFETQTbflfmsLiYq0a3A',
          docs: 'https://script.google.com/home/projects/15PSzwCYukipKDEryRxpoAFDrTy7DmHC5NJ8hTZbLt9--kHL9Xr1UJqKp',
          aceptado: false,
          modalidad: '' ,
          pagado : true,
        }]);
    
    const [modalRegistroIsOpen , setModalRegistroIsOpen ] = useState(false);

    // useEffect(() => {} , [])

    return (
        <RegistroContext.Provider value={{
            data, setdata,
            modalRegistroIsOpen , setModalRegistroIsOpen
        }}>
            {children}
        </RegistroContext.Provider>
    )
}