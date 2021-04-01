import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import './App.css';
import Patient from './components/Patient';
import SuperAdmin from './components/SuperAdmin';
import CareProvider from './components/CareProvider';

const App = () => {
  return (
     <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/patient" component={Patient} />
          <Route path="/superpanel" component={SuperAdmin} />
          <Route path="/careprovider" component={CareProvider} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;
