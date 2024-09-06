import React, { useState } from 'react';
// Importación alternativa para bcryptjs
import * as bcrypt from 'bcryptjs';

import { Navbar } from '../components/Navbar';

export function Register() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Limpiar mensajes anteriores
    setError(null);
    setSuccessMessage(null);

    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Verificar si el correo electrónico ya está registrado
    const users = localStorage.getItem('users');
    const usersList = users ? JSON.parse(users) : [];
    const userExists = usersList.some((user: { email: string }) => user.email === email);

    if (userExists) {
      setError('El usuario con este correo electrónico ya existe');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    try {
      // Encriptar la contraseña usando bcryptjs
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { email, username, password: hashedPassword };
      
      // Guardar el nuevo usuario en el localStorage
      usersList.push(newUser);
      localStorage.setItem('users', JSON.stringify(usersList));

      // Limpiar formulario
      setEmail('');
      setUsername('');
      setPassword('');
      setSuccessMessage('Usuario registrado exitosamente');

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setError('Error al registrar el usuario. Inténtalo de nuevo.');

      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Registro de Usuarios</h1>
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
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Registrar</button>
      </form>
    </>
  );
}
