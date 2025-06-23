import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
       
        <div className="ml-auto d-flex align-items-center">
          <Link to="/favorites">
            <button className="btn btn-info mr-2">Mis Favoritos</button>
          </Link>      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;