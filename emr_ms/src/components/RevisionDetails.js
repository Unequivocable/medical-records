import React, { useContext, useState } from 'react';
import { CareProviderContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";
import axios from 'axios';

const RevisionDetails = () => {
const { data, setData, setPostData, postData } = useContext(CareProviderContext)
const { adminID } = useContext(LoginContext)
const [ results, setResults ] = useState([{}])
const [ rd, setRd ] = useState([{
  RevisionID: "",
  PatientID: "",
  CareProviderID: "",
  SuperAdminID: "",
  RevisionDetails: "",
  Timestamp: "" 
}])


  const handleSubmitRD = async (event) => {
    let limit = {
      HealthCardNumberID: 661466,
      limit: 5,
      offset: event.target.id
    }
    try {
      const response = await axios.get('api/revision', {params: limit}
          // headers: { Authorization: `Bearer ${token.token}` },
      );
      console.log(response);
      setRd(response.data)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }


    return (
        <>
            {rd.map((entry) => (
                 <div key={entry.RevisionID}>
                    {entry.RevisionID}<br />
                    {entry.PatientID}<br />
                    {entry.CareProviderID ? entry.CareProviderID : null} <br />
                    {entry.SuperAdminID ? entry.SuperAdminID : null} <br />
                    {entry.RevisionDetails} <br />
                    {entry.Timestamp} <br />
                </div>))}
                  <button onClick={handleSubmitRD} id="0">Get RD</button>
                  <button onClick={handleSubmitRD} id="5">Next Page</button>

        </>
    )
}

export default RevisionDetails;