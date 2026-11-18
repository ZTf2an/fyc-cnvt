import { createContext, useState } from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    // Inicializa el estado leyendo el token guardado, si existe
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (recievedToken) => {
        setToken(recievedToken);
        localStorage.setItem('token', recievedToken); // Bloquea la puerta con llave
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Quita la llave
    };

    return (
        <AuthContext.Provider value={{ token , isAuth: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};