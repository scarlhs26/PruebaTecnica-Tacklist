import React from 'react';
import { useNavigate } from 'react-router-dom'; 

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
}


