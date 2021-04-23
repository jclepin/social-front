import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className='menu background'>
      <nav>
        <ul>
          <li>
            <NavLink exact to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/me'>Me</NavLink>
          </li>
          <li>
            <NavLink to='/messages'>Messages</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
