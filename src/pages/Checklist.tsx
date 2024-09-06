// src/pages/ChecklistPage.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Checklist } from '../components/Check';
import { LogoutButton } from '../components/LogoutButton';
import DarkModeToggle from '../components/DarkModeToggle';
import '../styles/Generales.css';

export function ChecklistPage() {
  // Obtener el token del localStorage
  const token = localStorage.getItem('authToken');

  // Obtener el usuario logueado y mostrar su nombre
  const loggedInUserEmail = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const loggedInUser = users.find((user: { email: string }) => user.email === loggedInUserEmail);
  const username = loggedInUser ? loggedInUser.username : ''; // Obtener el nombre de usuario si existe

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Hola, {username}</h1>
        <LogoutButton />
        <Checklist />
        <DarkModeToggle />
      </div>
    </DndProvider>
  );
}
