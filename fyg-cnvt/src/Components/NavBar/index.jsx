import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { RegistroContext } from '../../Context' //borrar
import { useContext } from 'react' //borrar
import { Navbar } from 'react-bootstrap'

function NavBar () {
    const activeStyle = 'text-decoration-underline text-light'
    const { fetchData } = useContext(RegistroContext);
    return (
        <Navbar className="pixel-bg">
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand fw-bold" href="#"
                onClick={(e) => fetchData()} //BORRAR
                >
                    <span className="log">PIXEL FG</span>
                    {/* <span className="color-1 fs-6">&</span>
                    <span className="color-1">G</span> */}
                </a>

                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    <div className="n" role="search">
                        <ul className='navbar-nav me-auto mb-lg-0'>
                            <li className=''>
                                <NavLink 
                                    to='/'
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