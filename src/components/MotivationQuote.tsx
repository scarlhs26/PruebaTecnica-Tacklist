// src/components/MotivationQuote.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  // Define aquí los campos esperados en la respuesta de la API
  quote: string;
}

const MotivationQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<Quote>('https://frases-motivadoras-api.vercel.app/api/motivation');
        setQuote(response.data.quote);
      } catch (error) {
        setError('Failed to fetch quote');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Motivational Quote</h1>
      <p>{quote}</p>
    </div>
  );
};

export default MotivationQuote;
