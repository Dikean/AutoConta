import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const fetchAuthData = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const decodedToken = jwtDecode(token);
          setUserRoles(decodedToken['https://miapp.com/roles'] || []);
          setUserPermissions(decodedToken['https://miapp.com/permissions'] || []);
        } catch (error) {
          console.error('Error al obtener el token:', error);
        }
      }
    };

    fetchAuthData();
  }, [isAuthenticated, getAccessTokenSilently]);

  const contextValue = {
    userRoles,
    userPermissions,
    isAuthenticated
    // Puedes agregar aquí más datos del usuario si es necesario
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
