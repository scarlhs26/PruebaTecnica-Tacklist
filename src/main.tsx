import React from 'react'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChecklistPage } from './pages/Checklist';
import { Inicio } from './pages/Login';
import { Register } from './pages/Register';
import { PrivateRoute, PublicRoute } from './components/PrivateRouteProps';
import './styles/index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<PublicRoute element={<Inicio />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />

        {/* Rutas Privadas */}
        <Route path="/checklist" element={<PrivateRoute element={<ChecklistPage />} />} />

        {/* Ruta de Redirección */}
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
