import React from 'react';
import { NavLink } from 'react-router-dom'

const NavHeader = () => (
  <div>
    <nav>
      <NavLink to={'/'} exact>Create a new poll </NavLink>
    </nav>
  </div>
);

export default NavHeader;
