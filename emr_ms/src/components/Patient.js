import React from "react";
import Menu from "./sub-components/Menu";
import Nav from './sub-components/Nav'

const Patient = (props) => {
  return (
    <>
    <header>
      <Nav superadmin={props.location.superadmin} patient="active-page"/>
      <Menu superadmin={props.location.superadmin}/>
    </header>
    <div>
      <p>This is the test Patient Search/View/Edit page.  Care Provider would only see a Logout in the Nav.  Admin will also see buttons to Add and Delete.</p>
    </div>
    </>
  );
};

export default Patient;
