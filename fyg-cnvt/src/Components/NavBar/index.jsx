import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { RegistroContext } from '../../Context' //borrar
import { useContext } from 'react' //borrar
import { Navbar } from 'react-bootstrap'
import { FaCircle } from 'react-icons/fa'
const env = import.meta.env

function NavBar () {
    const activeStyle = 'text-decoration-underline text-light'
    const { fetchData, erpStatus, refreshErp } = useContext(RegistroContext);
    const erpStatusLabel = {
        checking: 'Verificando ERP…',
        connected: 'ERP conectado · volver a verificar',
        contingency: 'ERP en contingencia · reintentar conexión'
    }[erpStatus];
    const erpColor = {
        checking: '#ffc107',
        connected: '#28a745',
        contingency: '#dc3545'
    }[erpStatus];
    return (
        <Navbar className="conectivate-bg">
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand fw-bold" href="#"
                onClick={(e) => fetchData()} //BORRAR
                >
                    {/* <span className="color-1">CONEC</span>
                    <span className="color-2">TÍ</span>
                    <span className="color-3">VATE</span> */}
                    <span className="color-1">F</span>
                    <span className="color-2 fs-6">&</span>
                    <span className="color-3">G</span>
                </a>
                {env.VITE_VARIABLE}

                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    <div className="n" role="search">
                        <ul className='navbar-nav me-auto mb-lg-0'>
                            <li>
                                <button
                                    type="button"
                                    className="nav-link text-white-50 d-flex align-items-center gap-2"
                                    title={erpStatusLabel}
                                    aria-label={erpStatusLabel}
                                    disabled={erpStatus === 'checking'}
                                    onClick={refreshErp}
                                >
                                    <FaCircle style={{ color: erpColor }} aria-hidden="true" />
                                    ERP
                                </button>
                            </li>
                            <li className=''>
                                <NavLink 
                                    to='/registro'
                                    className={({isActive}) => (isActive ? activeStyle : 'text-white-50') + ' nav-link'}
                                >
                                    Registro
                                </NavLink>
                            </li>
                            <NavLink 
                                to='/gestion'
                                className={({isActive}) => (isActive ? activeStyle : 'text-white-50') + ' nav-link'}
                            >
                                Gestion
                            </NavLink>
                            <NavLink 
                                to='/cuentas'
                                className={({isActive}) => (isActive ? activeStyle : 'text-white-50') + ' nav-link'}
                            >
                                Cobranza
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default NavBar