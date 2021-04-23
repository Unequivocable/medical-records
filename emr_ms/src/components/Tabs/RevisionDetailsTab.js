import React, { useContext, useState, useEffect } from 'react';
import { PatientContext } from '../sub-components/Context'
import axios from 'axios';

//Routes are in routes.js but need to be revised
// This one is display only so we don't need edit or add -- we just need to ensure the pagination works

const RevisionDetails = () => {
const { setPostData, postData } = useContext(PatientContext)
const [ rd, setRd ] = useState([{
  RevisionID: "",
  PatientID: "",
  CareProviderID: "",
  SuperAdminID: "",
  RevisionDetails: "",
  Timestamp: "" 
}])

useEffect(() => {
  const getData = async () => {
    try {
      console.log(postData)
      const response = await axios.get('api/revision', { params: postData }
      // headers: { Authorization: `Bearer ${token.token}` },
  );
      console.log(response)
      setRd(response.data[0]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  getData();
}, [ postData, setRd ]);


  const handleSubmitRD = async (event) => {
     let limit = {
        HealthCardNumberID: 661466,
        limit: 5,
        offset: event.target.id
      }
    setPostData(limit)
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