import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles (incluye el fondo, tipografía, modal, etc.)
import { RouterProvider } from "react-router-dom";  // Para la configuración de rutas
import { router } from "./routes";  // Configuración de rutas
import { StoreProvider } from './hooks/useGlobalReducer';  // Estado global

// Componente que genera el fondo animado de estrellas
const StarsBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,         // Se coloca detrás del contenido principal
        pointerEvents: 'none'  // Para que no interfiera en la interacción
      }}
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="stars"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${1.5 + Math.random() * 2.5}s`
          }}
        />
      ))}
    </div>
  );
};

const Main = () => {
  return (
    <React.StrictMode>
      <StoreProvider>
        {/* Fondo animado de estrellas */}
        <StarsBackground />
        {/* Contenedor principal que se muestra por encima del fondo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <RouterProvider router={router} />
        </div>
      </StoreProvider>
    </React.StrictMode>
  );
};

// Renderiza el componente Main en el nodo "root"
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);