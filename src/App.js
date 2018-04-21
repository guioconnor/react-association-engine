import React from "react";
import { HashRouter, Link, Route } from "react-router-dom";

import Arithmetic from "./Arithmetic";
import Counting from "./Counting";

const Nav = () => (
  <ul>
    <li>
      <Link to="/arithmetic">Arithmetic</Link>
      <Link to="/counting">Counting</Link>
    </li>
  </ul>
);

const App = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Nav} />
      <Route exact path="/arithmetic" component={Arithmetic} />
      <Route exact path="/counting" component={Counting} />
    </div>
  </HashRouter>
);

export default App;
