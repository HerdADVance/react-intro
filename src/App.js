import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router"
import SearchParams from "./SearchParams"
import Details from "./Details"
import ThemeContext from "./ThemeContext"

const App = () => {
  
  const themeHook = useState("dodgerblue")

  return (
  	<ThemeContext.Provider value={themeHook}>
	    <div>
			<Link to="/">Adopt Me</Link>
			<Router>
				<SearchParams path="/" />
				<Details path="/details/:id" myvar={"lol"} />
			</Router>
	    </div>
    </ThemeContext.Provider>
  );

};

render(<App />, document.getElementById("root"));
