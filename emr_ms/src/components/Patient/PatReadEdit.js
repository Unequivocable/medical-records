import React, { useState, useContext, useEffect } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { NavLink, Redirect } from 'react-router-dom';
import AddressTab from '../Tabs/AddressTab'
import EmergencyContactTab from '../Tabs/EmergencyContactTab'
import NotesTab from '../Tabs/NotesTab'
import PatientSummaryTab from '../Tabs/PatientSummaryTab';
import RevisionDetailsTab from '../Tabs/RevisionDetailsTab';

const PatReadEdit = () => {
  const { 
      data, setData, 
      postData,  
      changes, setChanges, 
      edit, setEdit } = useContext(PatientContext)
  const { adminID, careID } = useContext(LoginContext)
  const [ deleted, setDeleted ] = useState(false)
  const [ tabIndex, setTabIndex ] = useState(0)


useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('api/patient', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    );
        console.log(response)
        setData(response.data[0]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setData ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    setChanges([...changes, name]);
  }

// Handles the checkbox changes adding to 'data' and 'changes'
  const handleChangeCheckbox = (event) => {
    const { name } = event.target;
    setData({
      ...data,
      [name]: event.target.checked,
    });
    setChanges([...changes, name]);
  }

//Submits the form data after running 'sendData' to create the final object of changed data.    
const handleSubmit = async (event) => {
  event.preventDefault()
  let sendData = [] 
  let filteredChanges = changes.filter(function(item, index){
    return changes.indexOf(item) >= index;
  });
  filteredChanges.forEach(column => {
      if(data[column]){
            sendData = ({...sendData, [column]: data[column] })
          }
      })
  
  const createRD = (PatientID) => {
    if(careID){
    return {
        PatientID: PatientID,
        CareProviderID: careID,
        RevisionDetails: "Updated fields: " + filteredChanges.filter(field => field !== "HealthCardNumberID").join(", ")
      }
  } else {
     return {
      PatientID: PatientID,
      SuperAdminID: adminID,
      RevisionDetails: "Updated fields: " + filteredChanges.filter(field => field !== "HealthCardNumberID").join(", ")
    }
  }}
  let revisionDetails = createRD(sendData.HealthCardNumberID);
  try {
    const response = await axios({
      method: "put",
      url: "api/patient/edit",
      data: sendData
      // headers: { Authorization: `Bearer ${token.token}` },
    });
    const rdAdd = await axios({
      method: "post",
      url: "api/revision/add",
      data: revisionDetails
      // headers: { Authorization: `Bearer ${token.token}` },
    });
    console.log(rdAdd)
    console.log(response);
    alert("Data has been updated");
    setChanges([ 'HealthCardNumberID' ])
    setEdit(!edit)
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

  const handleDelete = async (event) => { 
    const deleteData = { HealthCardNumberID: [event.target.id] }
    const createRD = (PatientID) => {
      if(careID){
      return {
          PatientID: PatientID,
          CareProviderID: careID,
          RevisionDetails: "Deleted Patient"
        }
    } else {
       return {
        PatientID: PatientID,
        SuperAdminID: adminID,
        RevisionDetails: "Deleted Patient"
      }
    }}
    let revisionDetails = createRD(event.target.id);

    if (window.confirm("Please select Ok to confirm you want to delete this patient.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "delete",
          url: "api/patient/delete",
          data: deleteData,
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        const rdAdd = await axios({
          method: "post",
          url: "api/revision/add",
          data: revisionDetails
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        console.log(rdAdd)
        console.log(response);
        alert("Patient has been deleted");
        setDeleted(true)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }

  


    return (
        <>
         {deleted ? <Redirect to="/patient" /> : null}
      {adminID ? <><NavLink to="/add"><button>Add</button></NavLink><button onClick={handleDelete} id={data.HealthCardNumberID}>Delete</button></> : null }
      <NavLink to="/patient"><button>Search</button></NavLink>
      <button onClick={()=>setEdit(!edit)}>Edit</button>

      <form className="patient" onSubmit={handleSubmit}>
        <label htmlFor="healthCardNum">Health Card Number:</label>
        <input type="text" className='not-form' name="HealthCardNumberID" placeholder={data.HealthCardNumberID} value={data.HealthCardNumberID} disabled={true}/>

        <label htmlFor="firstName">First Name:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="firstName" placeholder={data.firstName} value={data.firstName} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="lastName" placeholder={data.lastName} value={data.lastName} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Phone">Phone:</label>
        <input type="phone" className={edit ? 'not-form' : 'form'} name="Phone" placeholder={data.Phone}  value={data.Phone} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Phone2">Phone2:</label>
        <input type="phone" className={edit ? 'not-form' : 'form'} name="Phone2" placeholder={data.Phone2}
        value={data.Phone2 ? data.Phone2 : "123456789"} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Email">Email:</label>
        <input type="email" className={edit ? 'not-form' : 'form'} name="Email" placeholder={data.Email} value={data.Email} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Language">Language:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="Language" placeholder={data.Language} value={data.Language} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="BirthDate">Date of Birth:</label>
        <input type="date" className={edit ? 'not-form' : 'form'} name="BirthDate" placeholder={data.BirthDate} value={data.BirthDate} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Gender">Gender:</label>
        <select name="Gender" defaultValue={data.Gender} value={data.Gender} className={edit ? 'not-form' : 'form'} onChange={handleChange} disabled={edit}>
          <option value="M" disabled={edit}>Male</option>
          <option value="F" disabled={edit}>Female</option>
          <option value="O" disabled={edit}>Other</option>
        </select>

        <label htmlFor="EthnicBackground">Ethnic Background:</label>
        <input type="text" name="EthnicBackground" className={edit ? 'not-form' : 'form'} placeholder={data.EthnicBackground} value={data.EthnicBackground} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="InsuranceProvider">Insurance Provider:</label>
        <input type="text" name="InsuranceProvider" className={edit ? 'not-form' : 'form'} placeholder={data.InsuranceProvider} value={data.InsuranceProvider} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Smoker">Smoker:</label>
        <input type="checkbox" name="Smoker" className={edit ? 'not-form' : 'form'} onChange={handleChangeCheckbox} checked={data.Smoker} disabled={edit}/>
        {!edit ? <input type="submit" /> : null}
      </form>

      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        <Tab>Address</Tab>
        <Tab>Emergency Contact</Tab>
        <Tab>Patient Health Summary</Tab>
        <Tab>Notes</Tab>
        <Tab>Revision Details</Tab>
      </TabList>
      <TabPanel className="address">
        <AddressTab />
      </TabPanel>
      <TabPanel className="emergencyContact">
        <EmergencyContactTab />
       </TabPanel>
      <TabPanel className="patientHealthSummary">
        <PatientSummaryTab />
      </TabPanel>
      <TabPanel className="Notes">
        <NotesTab />
      </TabPanel>
      <TabPanel className="RevisionDetails">
        <RevisionDetailsTab />
        </TabPanel>
    </Tabs>
  

        </>
    )
}

export default PatReadEdit;