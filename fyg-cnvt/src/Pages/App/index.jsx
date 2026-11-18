import NavBar from "../../Components/NavBar"
import { HashRouter, Navigate, useLocation, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import Registro from '../Registro'
import Cuentas from '../Cuentas'
import Gestion from "../Gestion"
import NotFound from '../NotFound'
import Login from '../Login'
import { RegistroProvider } from "../../Context"
import { AuthContext, AuthProvider } from "../../auth"
import Layout from "../../Components/Layout"
import { ProtectedRoute } from '../../Components/ProtectedRoute' // <-- Importas el bloqueador

const AppRoutes = () => {
  const location = useLocation()
  const { isAuth } = useContext(AuthContext)
  let routes = useRoutes([
    // Ruta pública
    { path : '/', element : isAuth ? <Navigate to="/registro" replace /> : <Login />},
    
    // RUTAS PRIVADAS (Bloqueadas por el token)
    { 
      element: <ProtectedRoute />,
      children: [
        { path : 'registro' , element : <Registro />},
        { path : 'cuentas', element : <Cuentas />},
        { path : 'gestion', element : <Gestion />}
      ]
    },

    // RUTA NO ENCONTRADA
    { path : '/*' , element : <NotFound />}
  ]);
  
  if (location.pathname === '/') {
    return routes
  }

  return (
    <>
      <NavBar />
      <Layout>{routes}</Layout>
    </>
  )
}

function App() {
  return (
    <>
      <AuthProvider>
        <RegistroProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </RegistroProvider>
      </AuthProvider>
    </>
  )
}

export default App
