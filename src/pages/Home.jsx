import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { buildApiUrl } from "../components/apiUtils";
import CardItem from "../components/CardItem";

export const Home = () => {
  const { store } = useGlobalReducer();
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch de personajes
    fetch(buildApiUrl("people"))
      .then((res) => res.json())
      .then((data) => setPeople(data.results))
      .catch((err) => console.error(err));

    // Fetch de planetas
    fetch(buildApiUrl("planets"))
      .then((res) => res.json())
      .then((data) => setPlanets(data.results))
      .catch((err) => console.error(err));

    // Fetch de vehículos
    fetch(buildApiUrl("vehicles"))
      .then((res) => res.json())
      .then((data) => setVehicles(data.results))
      .catch((err) => console.error(err));
  }, []);

return (
  <div className="container mt-4">
   <img
  src="https://media.giphy.com/media/5wikad3qSOqAg/giphy.gif"
  alt="Star Wars Logo"
  style={{
    width: "80%",
    height: "auto",
    display: "block",
    margin: "0 auto 1.5rem"
  }}
/>
    <h2>Personajes</h2>
    <div className="row">
      {people.length === 0 ? (
        <p>Cargando personajes...</p>
      ) : (
        people.map((item) => (
          <CardItem key={item.uid} item={item} category="people" />
        ))
      )}
    </div>
    <h2>Planetas</h2>
    <div className="row">
      {planets.length === 0 ? (
        <p>Cargando planetas...</p>
      ) : (
        planets.map((item) => (
          <CardItem key={item.uid} item={item} category="planets" />
        ))
      )}
    </div>
    <h2>Vehículos</h2>
    <div className="row">
      {vehicles.length === 0 ? (
        <p>Cargando vehículos...</p>
      ) : (
        vehicles.map((item) => (
          <CardItem key={item.uid} item={item} category="vehicles" />
        ))
      )}
    </div>
  </div>
);
};