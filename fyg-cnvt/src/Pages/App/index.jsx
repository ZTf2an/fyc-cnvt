import NavBar from "../../Components/NavBar"
import { useRoutes , BrowserRouter } from 'react-router-dom'
import Registro from '../Registro'
import Cuentas from '../Cuentas'
import Gestion from "../Gestion"
import NotFound from '../NotFound'
import { RegistroProvider } from "../../Context"
import Layout from "../../Components/Layout"


const AppRoutes = () => {
  let routes = useRoutes([
    { path : '/' , element : <Registro />},
    {path : '/cuentas', element : <Cuentas />},
    {path : '/gestion', element : <Gestion />},
    {path : '/*' , element : <NotFound />}
  ]);
  return routes
}

function App() {
  return (
    <>
      <RegistroProvider>
        <BrowserRouter>
          <NavBar />
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </RegistroProvider>
    </>
  )
}

export default App
