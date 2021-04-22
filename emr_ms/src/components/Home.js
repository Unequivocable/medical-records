import React, { useState, useContext } from 'react'
import { useHistory, useLocation, NavLink, Redirect } from 'react-router-dom'
import { LoginContext } from './sub-components/Context'

import axios from 'axios';

//import { LoginContext } from './components/sub-components/Context'

const Home = () => {
    let history = useHistory();
    let location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(true)
    const { setToken, careID, setCareID, adminID, setAdminID } = useContext(LoginContext);


    const submit = async (e) => {
        e.preventDefault()
        const data = JSON.stringify({username, password})
        const res = await axios({
        method: 'post',
        url: 'api/auth',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
        })
        .then(function (res){
          //sessionStorage.setItem('token', res.data.token)
          //console.log(payload.data.results[0].Username)
          setToken(res.data.token);

          if (res.data.results[0].SuperAdminID == null){
            setCareID(res.data.results[0].CareProviderID);  
            
            // let { from } = location.state || { from: { pathname: "/patient/" } };
            // history.replace(from);
          } else {
            setAdminID(res.data.results[0].SuperAdminID);  
            // let { from } = location.state || { from: { pathname: "/superpanel/"} };
            // history.replace(from);
          }
        })
        .catch(function(res){
          console.log(res)
          setAuth(false)

        })
    }

  return (
    <div className="login">
      {!auth &&
        <h4>Incorrect Username or Password</h4>
      }
      <h1>Login</h1>
      <form className="contact-form" name="login" onSubmit={submit}>
        <input type="text" placeholder="username" name="username" autoComplete="off" onChange={e => setUsername(e.target.value)}/> 
        <input type="password" placeholder="password" name="password" onChange={e => setPassword(e.target.value)}/>
        <input className="form-btn" type="submit" value="Login"/>
      </form>
      { careID ? <Redirect to="/patient" /> : null }
      { adminID ? <Redirect to="/superpanel" /> : null }
      <NavLink to= {{
            pathname: "/patient",
            superadmin: false
            }}>Login as Care Provider</NavLink>
      <NavLink to="/superpanel">Login as SuperAdmin</NavLink>
    </div>
  );
};

export default Home;
