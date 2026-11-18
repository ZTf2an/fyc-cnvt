import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth'; // Ajusta tu ruta

export const ProtectedRoute = () => {
    const { isAuth } = useContext(AuthContext);

    // Si no hay token, lo redirige al login. Si hay, renderiza el componente solicitado.
    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};