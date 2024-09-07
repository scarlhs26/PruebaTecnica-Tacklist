import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos
import * as bcrypt from 'bcryptjs';
import Captus from '../img/captus.png';
import {  NavLink } from "react-router-dom";


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
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setTimeout(() => setError(null), 5000);
      return;
    }

    // Verificar si el correo electrónico ya está registrado
    const users = localStorage.getItem('users');
    const usersList = users ? JSON.parse(users) : [];
    const userExists = usersList.some((user: { email: string }) => user.email === email);

    if (userExists) {
      setError('El usuario con este correo electrónico ya existe');
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      // Generar un ID único para el nuevo usuario
      const id = uuidv4();

      // Encriptar la contraseña usando bcryptjs
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { id, email, username, password: hashedPassword };

      // Guardar el nuevo usuario en el localStorage
      usersList.push(newUser);
      localStorage.setItem('users', JSON.stringify(usersList));

      // Guardar el usuario actual en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify({ email, username }));

      // Limpiar formulario
      setEmail('');
      setUsername('');
      setPassword('');
      setSuccessMessage(`Usuario ${username} registrado exitosamente`);

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setError('Error al registrar el usuario. Inténtalo de nuevo.');

      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <>
    <section className="w-full h-screen flex justify-center items-center bg-[#D5E4E1]">
      <div className="bg-[#ffffff] rounded-2xl p-6 max-w-sm mx-auto shadow-lg">
        <img className="p-4 w-32 ml-20" src={Captus} alt="Captus" />
        <h1 className="text-3xl text-center mb-4">Registro de Usuarios</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full">
            <input
              type="email"
              id="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#eee] border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              id="username"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[#eee] border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#eee] border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-40 mt-5 bg-[#103A36] text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-[#1d635c] focus:outline-none focus:ring-2 focus:ring-[#1d635c]"
          >
            Registrar
          </button>
          <div className="mt-2 w-60 text-center h-12">
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta? <NavLink to="/">Login</NavLink>
          </p>
        </form>
      </div>
    </section>
  </>
  );
}