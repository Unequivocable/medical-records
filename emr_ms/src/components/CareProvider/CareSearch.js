import React, { useContext, useState } from 'react';
import { CareProviderContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";
import axios from 'axios';

const CareSearch = () => {
const { data, setData, setPostData, postData } = useContext(CareProviderContext)
const { adminID } = useContext(LoginContext)
const [ search, setSearch ] = useState({
    MedicalLicenseID: "",
    lastName: ""
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
    try {
      const response = await axios.get('api/cp/medicalID', {params: search}
          // headers: { Authorization: `Bearer ${token.token}` },
      );
      console.log(response);
      setResults(response.data)
      setSearch({
        MedicalLicenseID: "",
        lastName: "",
    })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleSubmitName = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.get('api/cp/name', {params: search}
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
    try {
      const response = await axios.get('api/cp/all'
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


// This puts the MedicalLicenseID into postData, which will be read by the PatReadEdit page to do the retrieval of data on
const addSwitch = (event) => {
    setPostData({ MedicalLicenseID: event.target.id})
}


    return (
        <>
          <NavLink to="/careadd"><button>Add</button></NavLink><br/>
             <form className="patient" onSubmit={handleSubmit}>
                <label htmlFor="MedicalLicenseID">Search by Medical License ID</label>
                    <input type="text" className='form' name="MedicalLicenseID" placeholder="Care Provider Medical Licence ID" value={search.MedicalLicenseID} onChange={handleChange}/>
                <input type="submit" />
              </form>
              <form className="patient" onSubmit={handleSubmitName}>
                <label htmlFor="lastName">Search by Care Provider's Last Name</label>
                    <input type="text" className='form' name="lastName" placeholder="Doe" value={search.lastName} onChange={handleChange}/>
                <input type="submit" />
              </form>
              <button onClick={searchAll}>Retrieve all active Care Providers</button>
              {results.map((entry) => (
                 <div key={entry.MedicalLicenseID}>
                    <NavLink to="/careread" onClick={addSwitch} id={entry.MedicalLicenseID}>{entry.MedicalLicenseID}</NavLink>
                    {entry.firstName} <br />
                    {entry.lastName} <br />
                    {entry.Phone} <br />
                    {entry.Email} <br />
                </div>))}


        </>
    )
}

export default CareSearch;