import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "./Context";

const Nav = (props) => {
  const { setCareID, setAdminID } = useContext(LoginContext)
  
  const logout = () => {
    setCareID("");
    setAdminID("")
  }
  
  return (
    <nav>
      <ul>
        <li className="inactive logout">
          <NavLink onClick={logout} to="/">Logout</NavLink>
        </li>
        {props.superadmin ?  
          <>
          <li className={props.patient}>
          <NavLink to= {{
            pathname: "/patient",
            superadmin: true
            }}>Patient</NavLink>
           </li>
          <li className={props.careprovider}>
             <NavLink to="/careprovider">Care Providers</NavLink>
            </li>
            <li className={props.superpanel}>
              <NavLink to="/superpanel">SuperAdmin Panel</NavLink>
            </li>
          </>      
        : null}
      </ul>
    </nav>
  );
};

export default Nav;
