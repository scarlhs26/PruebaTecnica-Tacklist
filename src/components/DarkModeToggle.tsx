// src/components/DarkModeToggle.tsx
import React, { useState, useEffect } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Recuperar el estado del modo oscuro del localStorage si existe
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    // Aplicar el modo oscuro o claro según el estado
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Guardar el estado del modo oscuro en localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode(prevMode => !prevMode)}>
      {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default DarkModeToggle;
