import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import './App.css';
import Patient from './components/Patient/Patient';
import SuperAdmin from './components/SuperAdmin';
import CareProvider from './components/CareProvider/CareProvider';
import { LoginContext } from './components/sub-components/Context'

const App = () => {
  const [username, setUsername] = useState("");
  const [careID, setCareID] = useState("");
  const [adminID, setAdminID] = useState("");
  const [token, setToken] = useState("");

  return (
      <LoginContext.Provider
         value={{
           username,
           setUsername,
           token,
           setToken,
           careID,
           setCareID,
           adminID, 
           setAdminID
          }}
      >
     <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/patient" component={Patient} />
          <Route path="/superpanel" component={SuperAdmin} />
          <Route path="/careprovider" component={CareProvider} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
      </LoginContext.Provider>
  );
};

export default App;
