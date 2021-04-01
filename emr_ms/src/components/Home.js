import React from "react";
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <p>This is the test Home Page -- it will be a login page.  Login as Care Provider sends to Patient Page only.  Login as SuperAdmin sends to SuperAdmin panel.</p>
      <NavLink to= {{
            pathname: "/patient",
            superadmin: false
            }}>If your user ID is a Care Provider</NavLink><br />
      <NavLink to="/superpanel">If your user ID is a SuperAdmin</NavLink>
    </div>
  );
};

export default Home;
