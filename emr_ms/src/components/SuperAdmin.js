import React from "react";
import Nav from './sub-components/Nav'

const SuperAdmin = () => {
  return (
    <>
    <header>
      <Nav superadmin="true" superpanel="active-page" />
    </header>
    <div className="main">
      <p>Welcome SuperAdmin.  You can select Patients or Care Providers to Add, View, Edit, and Delete them.</p>
    </div>
    </>
  );
};

export default SuperAdmin;
