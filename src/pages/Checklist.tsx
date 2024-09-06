// src/pages/ChecklistPage.tsx
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Checklist } from "../components/Check";
import { LogoutButton } from "../components/LogoutButton";
import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/Generales.css";

export function ChecklistPage() {
  // Obtener el token del localStorage
  const token = localStorage.getItem("authToken");

  // Obtener el usuario logueado y mostrar su nombre
  const loggedInUserEmail = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const loggedInUser = users.find(
    (user: { email: string }) => user.email === loggedInUserEmail
  );
  const username = loggedInUser ? loggedInUser.username : ""; // Obtener el nombre de usuario si existe

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#D5E4E1] w-full	h-screen cuerpo">
        <nav className="flex justify-between p-8">
          <LogoutButton />
          <DarkModeToggle />
        </nav>
        <div className="flex flex-col items-center">
          <div className="w-2/5">
            <h1 className="text-3xl font-bold	mb-4">Hola, {username}</h1>
            <p className="font-thin  text-xs	">Frase del dia:</p>
          </div>
          <Checklist />
        </div>
        
      </div>
    </DndProvider>
  );
}
