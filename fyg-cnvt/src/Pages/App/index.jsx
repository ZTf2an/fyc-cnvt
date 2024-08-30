import NavBar from "../../Components/NavBar"
import { useRoutes , BrowserRouter } from 'react-router-dom'
import Registro from '../Registro'
import Cuentas from '../Cuentas'
import NotFound from '../NotFound'

const AppRoutes = () => {
  let routes = useRoutes([
    { path : '/' , element : <Registro />},
    {path : '/cuentas', element : <Cuentas />},
    {path : '/*' , element : <NotFound />}
  ]);
  return routes
}

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
