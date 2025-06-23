import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Home } from './pages/Home.jsx';
import { Details } from './pages/Details.jsx';
import { Favorites } from './pages/Favorites.jsx';
// Root layout that includes the Navbar and an Outlet for nested routes
const Root = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// Define the router configuration with nested routes.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error: Página no encontrada</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "favorites", element: <Favorites /> },
      { path: "details/:category/:id", element: <Details /> },
    ],
  },
]);