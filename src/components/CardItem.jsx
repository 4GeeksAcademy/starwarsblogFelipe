import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardItem = ({ item, category }) => {
  const { store, dispatch } = useGlobalReducer();

  const [showModal, setShowModal] = useState(false);
  const imageCategory = category === "people" ? "characters" : category;
  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${imageCategory}/${item.uid}.jpg`;
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWqAMI1ft_iv8dbVErq6pvS1MzGNRDMjBS_XL-jPrtmk_iXeGogvZ8xVOegqCc8bBF_U&usqp=CAU";

  const isFavorite = store.favorites.some((fav) => fav.uid === item.uid);

  const handleFavorite = () => {
    const payload = {
      ...item,
      category,
      image: imageUrl,
    };

    if (!isFavorite) {
      dispatch({ type: "ADD_FAVORITE", payload });
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1800);
    } else {
      dispatch({ type: "REMOVE_FAVORITE", payload });
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 starwars-card">
        <img
          src={imageUrl}
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
              to={`/details/${category}/${item.uid}/`}
              className="btn btn-primary"
            >
              Ver detalles
            </Link>
            <button
              onClick={handleFavorite}
              className={`btn ${isFavorite ? "btn-danger" : "btn-warning"}`}
            >
              {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="custom-modal">✅ Añadido a Favoritos</div>
      )}
    </div>
  );
};

export default CardItem;