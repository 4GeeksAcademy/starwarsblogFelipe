import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (item) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: item });
  };

  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWqAMI1ft_iv8dbVErq6pvS1MzGNRDMjBS_XL-jPrtmk_iXeGogvZ8xVOegqCc8bBF_U&usqp=CAU";

  return (
    <div className="container mt-4 text-light">
      <h2 className="mb-4">Favoritos</h2>
      {store.favorites.length === 0 ? (
        <p>No tienes elementos favoritos.</p>
      ) : (
        <div className="row">
          {store.favorites.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="mt-auto d-flex flex-wrap gap-2">
                    <Link
                      to={`/details/${item.category}/${item.uid}/`}
                      className="btn btn-primary"
                    >
                      Ver detalles
                    </Link>
                    <button
                      onClick={() => removeFavorite(item)}
                      className="btn btn-danger"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Link to="/" className="btn btn-info">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};