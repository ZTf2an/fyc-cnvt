import './NavBar.css'
import { NavLink } from 'react-router-dom'

function NavBar () {
    return (
        <nav className="navbar navbar-expand-sm conectivate-bg">
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand fw-bold" href="#">
                    {/* <span className="color-1">CONEC</span>
                    <span className="color-2">TÍ</span>
                    <span className="color-3">VATE</span> */}
                    <span className="color-1">F</span>
                    <span className="color-2 fs-6">&</span>
                    <span className="color-3">G</span>
                </a>

                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    <div className="n" role="search">
                        <ul className='navbar-nav me-auto mb-lg-0'>
                            <NavLink 
                                to='/'
                                className='nav-link text-light'
                            >
                                Registro
                            </NavLink>
                            <NavLink 
                                to='/gestion'
                                className='nav-link text-light'
                            >
                                Gestion
                            </NavLink>
                            <NavLink 
                                to='/cuentas'
                                className='nav-link text-light'
                            >
                                Cobranza
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar