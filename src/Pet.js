import React from "react";

export default function Pet({ name, animal, breed }) {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <p>{breed}</p>
    </div>
  );
}
