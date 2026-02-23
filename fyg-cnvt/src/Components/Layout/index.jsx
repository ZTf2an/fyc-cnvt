import { useContext } from 'react'
import {ToastAlerter} from '../Toast'
import { ToastContainer } from 'react-bootstrap'
import { RegistroContext  } from '../../Context'
function Layout ({children}) {
    const {activeToast} = useContext(RegistroContext)
    return (
        <div className="container-fluid my-2">
            <ToastContainer className="mb-1 me-1" position='bottom-end'>
                { activeToast.length > 0 && 
                activeToast.map((obj , idx) => {
                    return <ToastAlerter 
                        key={idx} 
                        msj={obj.msj}
                        status={obj.status}
                    />
                })}
            </ToastContainer>
            {children}
        </div>
    )
}

export default Layout