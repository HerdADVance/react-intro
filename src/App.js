import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import SearchParams from "./SearchParams"

const App = () => {
  return (
    <div>
      {/*<h1>Adopt Me</h1>
      <Pet name="Nibbler" animal="cat" breed="who knows" />
      <Pet name="Frank" animal="dog" breed="wiener" />
      <Pet name="Cucullin" animal="dog" breed="German Shepherd" />*/}
      <SearchParams/>
    </div>
  );
};

render(<App />, document.getElementById("root"));
