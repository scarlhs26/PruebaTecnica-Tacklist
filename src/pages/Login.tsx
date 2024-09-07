import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import "../styles/index.css";
import Captus from '../img/captus.png';

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
      <section className="w-full	h-screen flex  justify-center	items-center bg-[#D5E4E1] 		">

        <div className=" bg-[#ffffff] rounded-2xl	p-6 max-w-sm mx-auto  shadow-lg ">
        <img className="p-4 w-32		ml-20	" src={Captus} alt="Captus" />
          <h1 className="text-3xl	text-center mb-4	">Inicio de sesión</h1>
          <form onSubmit={handleSubmit} className="flex flex-col	items-center">
            <div className="flex ">
              <input
                placeholder="Correo electrónico"
                className="bg-[#eee] border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-300"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                placeholder="Contraseña"
                className="bg-[#eee] border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-300"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            

            <button
              className="w-40 mt-5 bg-[#103A36]  text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-[#1d635c]  focus:outline-none focus:ring-2 focus:bg-[#1d635c] "
              type="submit"
            >
              Iniciar Sesión
            </button>
            <div className=" mt-2 w-60 text-center		text-[12px]	h-12">{error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}</div>
            
            <p>
              ¿Aún no tienes una cuenta? <NavLink className="font-bold text-[#103A36]" to="/register">Registrate</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
