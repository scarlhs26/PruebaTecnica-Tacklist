import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  base: '/PruebaTecnica-Tacklist/', // Cambia 'PruebaTecnica-Tacklist' por el nombre de tu repositorio
  plugins: [react()]
});