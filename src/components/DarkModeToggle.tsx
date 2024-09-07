import React, { useState, useEffect } from 'react';

const getUserId = (): string | null => {
  return localStorage.getItem('loggedInUser'); 
};

const DarkModeToggle: React.FC = () => {
  const userId = getUserId();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (userId) {
      // Recuperar el estado del modo oscuro del localStorage si existe
      const savedMode = localStorage.getItem(`darkMode_${userId}`);
      return savedMode === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (userId) {
      const cuerpoElement = document.querySelector('.cuerpo');
      if (cuerpoElement) {
        // Aplicar o quitar la clase dark-mode
        if (isDarkMode) {
          cuerpoElement.classList.add('dark-mode');
        } else {
          cuerpoElement.classList.remove('dark-mode');
        }
      }
      // Guardar el estado del modo oscuro en localStorage
      localStorage.setItem(`darkMode_${userId}`, JSON.stringify(isDarkMode));
    }
  }, [isDarkMode, userId]);

  return (
    <button
      onClick={() => setIsDarkMode(prevMode => !prevMode)}
      className="mode-toggle-button"
    >
      {isDarkMode ? (
        <i className="lnir-sun text-3xl"></i>  // Ícono para modo claro
      ) : (
        <i className="lnir-moon text-3xl"></i>  // Ícono para modo oscuro
      )}
    </button>
  );
};

export default DarkModeToggle;
