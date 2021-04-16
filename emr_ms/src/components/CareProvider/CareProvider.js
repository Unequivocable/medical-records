import React, { useState, useContext, useEffect } from "react";
import Nav from '../sub-components/Nav'
import Menu from '../sub-components/Menu'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CareProviderContext, LoginContext } from '../sub-components/Context'
import CareReadEdit from "./CareReadEdit";
import CareAdd from './CareAdd'
import CareSearch from "./CareSearch";

const CareProvider = () => {
  // Imports any of the App level Login variables
  const { token } = useContext(LoginContext);

  //  Sets ability to edit on or off -- this needs to be in the edit page component so may need to be moved
    const [edit, setEdit] = useState(false);

  //  Data is where the GET import of details is stored.  useState default needs to match column names in DB with initial values in it.  Still need to add in temp data for Care Provider fields for this page
  const [data, setData] = useState({
    MedicalLicenseID: 'MedicalLicenseID',
    firstName: "First Name",
    lastName: "Last Name",
    Email: "address@email.com",
    AreaofPractice: "Area of Practice",
    Phone: "0123456789",
  });

  // Changes is an array that contains only fields that have changed.  Is used to only send changed fields to DB as well as to add into Revision Details.  Default state needs to contian primary ID.
  const [changes, setChanges] = useState([ 'MedicalLicenseID' ]);

  // postData is the filtered data of any changed fields that will be sent to the DB.
  const [postData, setPostData] = useState({});

  return (
        // Any component within the context Provider wrapper will have access to the state variables entered here
    <CareProviderContext.Provider
      values= {{
        data,
        changes
      }}
    >
    <header>
      <Nav superadmin="true" careprovider="active-page"/>
      <Menu superadmin="true"/>
    </header>
    <div className="main">
    <BrowserRouter>
        <Switch>
          <Route exact path="/careprovider" component={CareSearch} />
          <Route path="/cpadd" component={CareAdd} />
          <Route path="/cpread" component={CareReadEdit} />
        </Switch>
      </BrowserRouter>
      <p>This is the test Care Provider Add/Edit/Search/View/Delete page</p>
    </div>
    </CareProviderContext.Provider>
  );
};

export default CareProvider;
