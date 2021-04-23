import React, { useContext, useEffect, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

//Need routes built (see this file for names)
//Add and Delete not rebuilt

const EmergencyContactTab = () => {
const { postData } = useContext(PatientContext)
const { adminID } = useContext(LoginContext)
const [ deleted, setDeleted ] = useState(false)
const [ ecData, setEcData ] = useState({
    PatientID: "",
    firstName: "",
    lastName: "",
    Phone: "",
    Email: "",
    Relationship: ""
  })
const [changes, setChanges] = useState([ 'PatientID' ]);
const [edit, setEdit] = useState(true);

useEffect(() => {
    const getData = async () => {
      try {
        console.log(postData)
        const response = await axios.get('api/emergency', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    );
        console.log(response)
        setEcData(response.data[0]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setEcData ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEcData({
      ...ecData,
      [name]: value,
    });
    setChanges([...changes, name]);
  }


//Submits the form ecData after running 'sendData' to create the final object of changed data.    
  const handleSubmit = async (event) => {
    event.preventDefault()
    let sendData = [] 
    changes.forEach(column => {
        if(ecData[column]){
              sendData = ({...sendData, [column]: ecData[column] })
            }
        })
    console.log(sendData)
    try {
      const response = await axios({
        method: "post",
        url: "api/emergency/edit",
        data: sendData
        // headers: { Authorization: `Bearer ${token.token}` },
      });
      console.log(response);
      alert("Data has been updated");
      setChanges([ 'PatientID' ])
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleDelete = async (event) => { 
    const deleteData = { PatientID: [event.target.id] }
    
    if (window.confirm("Please select Ok to confirm you want to delete this address.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "post",
          url: "api/emergency/delete",
          data: deleteData,
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        console.log(response);
        alert("Address has been deleted");
        setDeleted(true)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }



    return (
      <>
        {/* {deleted ? <Redirect to="/patient" /> : null} */}
        {adminID ? (
          <>
            <NavLink to="/add">
              <button>Add</button>
            </NavLink>
            <button onClick={handleDelete} id={ecData.PatientID}>
              Delete
            </button>
          </>
        ) : null}
        <button onClick={() => setEdit(!edit)}>Edit</button>

        <form className="patient" onSubmit={handleSubmit}>
          <label htmlFor="healthCardNum">Health Card Number:</label>
          <input
            type="text"
            className="not-form"
            name="PatientID"
            placeholder={ecData.PatientID}
            value={ecData.PatientID}
            disabled={true}
          />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="firstName"
            placeholder={ecData.firstName}
            value={ecData.firstName}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="lastName"
            placeholder={ecData.lastName}
            value={ecData.lastName}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Phone">Phone:</label>
          <input
            type="phone"
            className={edit ? "not-form" : "form"}
            name="Phone"
            placeholder={ecData.Phone}
            value={ecData.Phone}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            className={edit ? "not-form" : "form"}
            name="Email"
            placeholder={ecData.Email}
            value={ecData.Email}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Relationship">Relationship:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="Relationship"
            placeholder={ecData.Relationship}
            value={ecData.Relationship}
            onChange={handleChange}
            readOnly={edit}
          />

          {!edit ? <input type="submit" /> : null}
        </form>
      </>
    );
}

export default EmergencyContactTab;