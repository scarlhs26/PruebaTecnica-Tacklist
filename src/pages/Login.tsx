// src/pages/Inicio.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import "../styles/index.css";

export function Inicio() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/checklist", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccessMessage(null);

    const users = localStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];

    const user = usersList.find(
      (user: { email: string; password: string }) => user.email === email
    );

    if (!user) {
      setError("El correo electrónico o la contraseña son incorrectos");
      setTimeout(() => setError(null), 5000);
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      setError("El correo electrónico o la contraseña son incorrectos");
      setTimeout(() => setError(null), 5000);
      return;
    }

    const token = uuidv4();

    localStorage.setItem("authToken", token);

    localStorage.setItem("loggedInUser", user.email);

    setSuccessMessage("Inicio de sesión exitoso");
    setTimeout(() => {
      setSuccessMessage(null);
      navigate("/checklist");
    }, 500);
  };

  return (
    <>
      <section className="w-full	h-screen flex  justify-center	items-center		">
        <div className="">
          <h1 className="">Inicio de sesión</h1>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <button type="submit">Iniciar Sesión</button>
            <p>¿Aun no tienes una cuenta? <a href="/register">Registrate</a></p>
          </form>
        </div>
      </section>
    </>
  );
}
