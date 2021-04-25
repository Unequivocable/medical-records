import React, { useContext, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";
import axios from 'axios';

const PatSearch = () => {
const { setPostData } = useContext(PatientContext)
const { careID, adminID } = useContext(LoginContext)
const [ search, setSearch ] = useState({
    HealthCardNumberID: "",
    lastName: "",
    CareProviderID: careID,
})
const [ results, setResults ] = useState([{}])

const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value,
    });
  }

const handleSubmit = async (event) => {
    event.preventDefault()
// If a CareProvider is logged in, then the CareID is added to the search to filter out only patients associated with that ID
    if(careID){
    setSearch({
        ...search,
        CareProviderID: careID,
      });
    }
    try {
      const response = await axios.get('api/p2c/patient', {params: search}
          // headers: { Authorization: `Bearer ${token.token}` },
      );
      console.log(response);
      setResults(response.data)
      setSearch({
        HealthCardNumberID: "",
        lastName: "",
        CareProviderID: careID,
    })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleSubmitName = async (event) => {
    event.preventDefault()
// If a CareProvider is logged in, then the CareID is added to the search to filter out only patients associated with that ID
    if(careID){
    setSearch({
        ...search,
        CareProviderID: careID,
      });
    }
    try {
      const response = await axios.get('api/p2c/name', {params: search}
          // headers: { Authorization: `Bearer ${token.token}` },
      );
      console.log(response);
      setResults(response.data)
      setSearch({
        HealthCardNumberID: "",
        lastName: "",
        CareProviderID: careID
    })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const searchAll = async (event) => {
// If a CareProvider is logged in, then the CareID is added to the search to filter out only patients associated with that ID
    if(careID){
    setSearch({
        ...search,
        CareProviderID: careID,
      });
    console.log(search)
    }
    try {
      const response = await axios.get('api/p2c/all', {params: search}
          // headers: { Authorization: `Bearer ${token.token}` },
      );
      console.log(response);
      setResults(response.data)
      setSearch({
        HealthCardNumberID: "",
        lastName: "",
        Phone: "", 
        CareProviderID: careID
    })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }


// This puts the HealthCardNumberID into postData, which will be read by the PatReadEdit page to do the retrieval of data on
const addSwitch = (event) => {
    setPostData({ HealthCardNumberID: event.target.id})
}


    return (
        <>
          {adminID ? <div><NavLink to="/add"><button>Add</button></NavLink><br/></div> : null}
             <form className="patient" onSubmit={handleSubmit}>
               <div>
                <label htmlFor="HealthCardNumberID">Search by Health Card Number</label>
                    <input type="text" className='form' name="HealthCardNumberID" placeholder="Patient Health Card Number" value={search.HealthCardNumberID} onChange={handleChange}/>
                <input type="submit" />
                </div>
              </form>
              <form className="patient" onSubmit={handleSubmitName}>
                <div>
                <label htmlFor="lastName">Search by Patient Last Name</label>
                    <input type="text" className='form' name="lastName" placeholder="Doe" value={search.lastName} onChange={handleChange}/>
                <input type="submit" /></div>
              </form>
              <div>
              <button onClick={searchAll}>Retrieve all valid Patients</button>
              </div>
              <div className="grid">
              {results.map((entry) => (
                 <div key={entry.HealthCardNumberID + entry.CareProviderID}>
                    <NavLink to="/read" onClick={addSwitch} id={entry.HealthCardNumberID}>{entry.HealthCardNumberID}</NavLink><br/>
                    {entry.firstName} <br />
                    {entry.lastName} <br />
                    {entry.Phone} <br />
                    {entry.CareProviderID} <br />
                </div>))}
                </div>
        </>
    )
}

export default PatSearch;