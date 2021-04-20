import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/me'>Me</Link>
          </li>
          <li>
            <Link to='/messages'>Messages</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
