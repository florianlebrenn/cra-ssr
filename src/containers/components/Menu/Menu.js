import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movie/tt0106062">Matrix movie</Link>
        </li>
        <li>
          <Link to="/something">A broken page link</Link>
        </li>
      </ul>
    );
  }
}

export default Menu;
