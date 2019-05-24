import React from 'react';
import { NavLink } from 'react-router-dom'

const NavHeader = () => (
  <div>
    <nav>
      <NavLink to={'/'} exact>Home | </NavLink>
      <NavLink to={'/vote'}>Vote | </NavLink>
      <NavLink to={'/chart'}>Chart </NavLink>
    </nav>
  </div>
);

export default NavHeader;
