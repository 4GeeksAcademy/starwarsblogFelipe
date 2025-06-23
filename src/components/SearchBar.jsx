import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const SearchBar = ({ data }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { store } = useGlobalReducer();
  const navigate = useNavigate();


  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    navigate(`/details/${item.category}/${item.uid}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }} className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={t("Buscar...")}
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          {suggestions.map((item) => (
            <li
              key={`${item.category}-${item.uid}`}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: "pointer" }}
            >
              {item.name} <small className="text-muted">({item.category})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;