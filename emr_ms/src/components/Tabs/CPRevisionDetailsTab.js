import React, { useContext, useState, useEffect } from 'react';
import { CareProviderContext } from '../sub-components/Context'
import axios from 'axios';

//Routes are in routes.js but need to be revised
// This one is display only so we don't need edit or add -- we just need to ensure the pagination works

const CPRevisionDetails = () => {
const { postData } = useContext(CareProviderContext)
const [ rdData, setRdData ] = useState([{
  RevisionID: "",
  PatientID: "",
  CareProviderID: "",
  SuperAdminID: "",
  RevisionDetails: "",
  Timestamp: "" 
}])
const [ page, setPage ] = useState(0)

useEffect(() => {
  const getData = async () => {
    let searchDetails = {
      CareProviderID: postData.MedicalLicenseID,
      limit: 10,
      offset: page
    }
    try {
      const response = await axios.get('api/revision/cp', { params: searchDetails }
      // headers: { Authorization: `Bearer ${token.token}` },
  );
      console.log(response)
      setRdData(response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  getData();
}, [ postData, setRdData, page ]);


  const handlePageForward = () => {
      setPage(page => page + 10)
  }
  const handlePageBackwards = () => {
    setPage(page => page - 10)
  }

    return (
        <>
            {rdData.map((entry) => (
                 <div key={entry.RevisionID}>
                   {entry.patientLN ? <> Revision ID: {entry.RevisionID} | {entry.cpFN} {entry.cpLN} made the following changes {entry.RevisionDetails} to {entry.patientFN} {entry.patientLN}'s account on {entry.Timestamp} <br /></> 
                   : 
                   <>Revision ID: {entry.RevisionID} | {entry.saFN} {entry.saLN} made the following changes: {entry.RevisionDetails} to {entry.cpFN} {entry.cpLN}'s account on {entry.Timestamp} <br /> </>}
                </div>))}
             {page===0 ? null: <button onClick={handlePageBackwards}>Previous Page</button>}
             {rdData.length<10 ? null : <button onClick={handlePageForward}>Next Page</button>}

        </>
    )
}

export default CPRevisionDetails;