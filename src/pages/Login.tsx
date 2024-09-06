import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Navbar } from '../components/Navbar';

export function Inicio() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();  // Hook para redirección

  useEffect(() => {
    // Verificar si ya hay un token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Redirigir si el token existe
      navigate('/checklist', { replace: true });
    }
  }, [navigate]); // Agregar `navigate` como dependencia

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Limpiar mensajes anteriores
    setError(null);
    setSuccessMessage(null);

    // Obtener usuarios del localStorage
    const users = localStorage.getItem('users');
    const usersList = users ? JSON.parse(users) : [];

    // Verificar si el usuario existe y la contraseña es correcta
    const user = usersList.find((user: { email: string; password: string }) => user.email === email);

    if (!user) {
      setError('El correo electrónico o la contraseña son incorrectos');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Verificar la contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      setError('El correo electrónico o la contraseña son incorrectos');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Generar un token único y seguro
    const token = uuidv4();  // Genera un UUID v4 único

    // Almacenar el token en el localStorage
    localStorage.setItem('authToken', token);

    // Redirigir a la página /checklist
    setSuccessMessage('Inicio de sesión exitoso');
    setTimeout(() => {
      setSuccessMessage(null);
      navigate('/checklist');
    }, 500);
  };

  return (
    <>
      <Navbar />
      <h1>Inicioo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </>
  );
}
