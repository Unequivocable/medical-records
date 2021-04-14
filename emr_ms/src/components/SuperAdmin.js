import React from "react";
import Nav from './sub-components/Nav'

const SuperAdmin = () => {
  return (
    <>
    <header>
      <Nav superadmin="true" superpanel="active-page" />
    </header>
    <div className="main">
      <p>This is the test SuperAdmin Page.  It should be where SuperAdmin's are sent upon login.  It will have links to Patient and CareProvider screens.  Edit User?  Add SuperAdmin??</p>
    </div>
    </>
  );
};

export default SuperAdmin;
