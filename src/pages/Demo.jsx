import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store } = useGlobalReducer();
  return (
    <div className="container mt-4">
      <h2>Demo Page: Context in Action</h2>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};