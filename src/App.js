import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router"
import SearchParams from "./SearchParams"
import Details from "./Details"

const App = () => {
  return (
    <div>
      <Link to="/">Adopt Me</Link>
      <Router>
      	<SearchParams path="/" />
      	<Details path="/details/:id" myvar={"lol"} />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
