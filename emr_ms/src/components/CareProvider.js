import React from "react";
import Nav from './sub-components/Nav'
import Menu from './sub-components/Menu'

const CareProvider = () => {
  return (
    <>
    <header>
      <Nav superadmin="true" careprovider="active-page"/>
      <Menu superadmin="true"/>
    </header>
    <div className="main">
      <p>This is the test Care Provider Add/Edit/Search/View/Delete page</p>
    </div>
    </>
  );
};

export default CareProvider;
