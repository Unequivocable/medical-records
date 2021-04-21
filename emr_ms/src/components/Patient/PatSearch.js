import React, { useContext, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";
import axios from 'axios';

const PatSearch = () => {
const { data, setData } = useContext(PatientContext)
const { careID, adminID } = useContext(LoginContext)
const [ search, setSearch ] = useState({
    HealthCardNumberID: "",
    lastName: "",
    CareProviderID: "",
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
        CareProviderID: "",
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
        CareProviderID: "",
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
        CareProviderID: "",
    })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

    return (
        <>
             <NavLink to="/add">Add</NavLink>
             <NavLink to="/read">Read</NavLink>
             <form className="patient" onSubmit={handleSubmit}>
                <label htmlFor="HealthCardNumberID">Search by Health Card Number</label>
                    <input type="text" className='form' name="HealthCardNumberID" placeholder="Patient Health Card Number" value={search.HealthCardNumberID} onChange={handleChange}/>
                <input type="submit" />
              </form>
              <form className="patient" onSubmit={handleSubmitName}>
                <label htmlFor="lastName">Search by Patient Last Name</label>
                    <input type="text" className='form' name="lastName" placeholder="Doe" value={search.lastName} onChange={handleChange}/>
                <input type="submit" />
              </form>
              <button onClick={searchAll}>Retrieve all valid Patients</button>
              {results.map((entry) => (
                 <div key={entry.HealthCardNumberID + entry.CareProviderID}>
                    {entry.HealthCardNumberID} <br />
                    {entry.firstName} <br />
                    {entry.lastName} <br />
                    {entry.Phone} <br />
                    {entry.CareProviderID} <br />
                </div>))}
        </>
    )
}

export default PatSearch;