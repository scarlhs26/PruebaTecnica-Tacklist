import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Checklist } from "../components/Check";
import { LogoutButton } from "../components/LogoutButton";
import DarkModeToggle from "../components/DarkModeToggle";
import axios from 'axios';
import "../styles/Generales.css";

export function ChecklistPage() {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener el usuario logueado y mostrar su nombre
  const loggedInUserEmail = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const loggedInUser = users.find(
    (user: { email: string }) => user.email === loggedInUserEmail
  );
  const username = loggedInUser ? loggedInUser.username : "";

  useEffect(() => {
    console.log("Fetching quote...");
    const fetchQuote = async () => {
      try {
        const response = await axios.get<{ text: string }>('https://cat-fact.herokuapp.com/facts/random');
        console.log("Response received:", response.data);
        setQuote(response.data.text);
      } catch (error: any) {
        console.error("Error fetching quote:", error);
        setError(error.response ? error.response.data : 'Failed to fetch quote');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="cuerpo full-height">
        <nav className="flex justify-between p-8">
          <LogoutButton />
          <DarkModeToggle />
        </nav>
        <div className="flex flex-col items-center">
          <div className="px-2 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Hola, {username}</h1>
            <p className="font-thin text-xs">Frase del día:</p>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p className="italic md:w-1/2">{quote}</p>
            )}
          </div>
          <Checklist />
        </div>
      </div>
    </DndProvider>
  );
}
