import React, { useState } from "react";
import Nav from '../sub-components/Nav';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PatientContext } from '../sub-components/Context'
import PatReadEdit from "./PatReadEdit";
import PatAdd from './PatAdd'
import PatSearch from "./PatSearch";
import AddressTab from "../Tabs/AddressTab";

const Patient = () => {

  //  Sets ability to edit on or off -- this needs to be in the edit page component so may need to be moved
  const [edit, setEdit] = useState(true);

  //  Data is where the GET import of details is stored.  useState default needs to match column names in DB with initial values in it.
  const [data, setData] = useState({
    HealthCardNumberID:"Health Card Number", 
    firstName: "First Name",
    lastName: "Last Name",
    Phone: "0123456789",
    Phone2: "0123456789",
    Email: "address@email.com",
    Language: "EN",
    BirthDate: '1980-05-16',
    Gender: "F",
    EthnicBackground: "Ethnic Background",
    InsuranceProvider: "Insurance Provider",
    Smoker: false
    });

// Changes is an array that contains only fields that have changed.  Is used to only send changed fields to DB as well as to add into Revision Details.  Default state needs to contian primary ID.
    const [changes, setChanges] = useState([ 'HealthCardNumberID' ]);
  
// postData is the filtered data of any changed fields that will be sent to the DB.
    const [postData, setPostData] = useState({});


  return (

    // Any component within the context Provider wrapper will have access to the state variables entered here

    <PatientContext.Provider
      value={{
        data,
        setData,
        changes,
        setChanges,
        edit,
        setEdit,
        postData,
        setPostData
      }}
    >
    <header>
      <Nav patient="active-page"/>
    </header>
    <div className="main">
      {/* This router allows the patient pages to be within the Patient Context and also swap between them simply.  We just need to put NavLinks or Redirect calls in the different pages to swap between them  */}
    <BrowserRouter>
        <Switch>
          <Route exact path="/patient" component={PatSearch} />
          <Route path="/add" component={PatAdd} />
          <Route path="/read" component={PatReadEdit} />
          <Route path="/address" component={AddressTab} />
        </Switch>
      </BrowserRouter>
    </div>

    </PatientContext.Provider>
  );
};

export default Patient;
