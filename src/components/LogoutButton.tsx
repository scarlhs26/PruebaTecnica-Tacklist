// src/components/LogoutButton.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';  // Para redirección

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('authToken');
    
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');  // Cambia '/login' a la ruta de tu página de inicio de sesión
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
}


