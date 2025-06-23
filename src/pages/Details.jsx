import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { buildApiUrl } from "../components/apiUtils";

const LinkedResource = ({ url }) => {
  const [name, setName] = useState("");
  const [resourcePath, setResourcePath] = useState("");

  useEffect(() => {
    const trimmedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
    const parts = trimmedUrl.split("/");
    const category = parts[parts.length - 2];
    const id = parts[parts.length - 1];
    setResourcePath(`/details/${category}/${id}/`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const nombre = data?.result?.properties?.name;
        setName(nombre || `[${category} #${id}]`);
      })
      .catch((err) => {
        console.error("Error fetching linked resource:", err);
        setName(`[${category}]`);
      });
  }, [url]);

  return <Link to={resourcePath}>{name || "Cargando..."}</Link>;
};

export const Details = () => {
  const { category, id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const url = buildApiUrl(category, id);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data.result))
      .catch((err) => console.error("Error fetching details:", err));
  }, [category, id]);

  const imageCategory = category === "people" ? "characters" : category;
  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${imageCategory}/${id}.jpg`;
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWqAMI1ft_iv8dbVErq6pvS1MzGNRDMjBS_XL-jPrtmk_iXeGogvZ8xVOegqCc8bBF_U&usqp=CAU";

  const isFavorite = store.favorites.some((item) => item.uid === id);

  const toggleFavorite = () => {
    const item = {
      uid: id,
      category,
      name: details.properties.name,
      image: imageUrl,
    };

    dispatch({
      type: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
      payload: item,
    });
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  if (!details) {
    return (
      <div className="container mt-4">
        <p>CARGANDO DETALLES...</p>
      </div>
    );
  }

  const entries = Object.entries(details.properties).filter(
    ([key]) => key !== "created" && key !== "edited"
  );

  const created = details.properties.created;
  const edited = details.properties.edited;

  return (
    <div className="container mt-4 text-warning">
      <h2 className="mb-3">{details.properties.name}</h2>
      <img
        src={imageUrl}
        alt={details.properties.name}
        className="img-fluid mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />
      <ul className="list-group mb-3">
        {entries.map(([key, value]) => (
          <li key={key} className="list-group-item small">
            <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong>{" "}
            {typeof value === "string" &&
            value.includes("https://www.swapi.tech/api/") ? (
              <LinkedResource url={value} />
            ) : Array.isArray(value) &&
              value.every(
                (v) =>
                  typeof v === "string" &&
                  v.includes("https://www.swapi.tech/api/")
              ) ? (
              value.map((url, i) => (
                <div key={i}>
                  <LinkedResource url={url} />
                </div>
              ))
            ) : (
              value?.toString()
            )}
          </li>
        ))}

        {(created || edited) && (
          <li className="list-group-item small">
            {created && <>🗓️ <strong>CREADO:</strong> {formatDate(created)}<br /></>}
            {edited && <>✏️ <strong>EDITADO:</strong> {formatDate(edited)}</>}
          </li>
        )}
      </ul>

      <div className="d-flex gap-3">
        <button
          onClick={toggleFavorite}
          className={`btn ${isFavorite ? "btn-danger" : "btn-warning"}`}
        >
          {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
        </button>
        <Link to="/" className="btn btn-info">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};