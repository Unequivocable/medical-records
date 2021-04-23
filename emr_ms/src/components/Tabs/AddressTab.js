import React, { useContext, useEffect, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';


//Add and Delete not setup
//Need to revise Edit as well so it's editing by AddressID so we don't get dupes
//Need to make this iterable (ie.  Array that uses .map to display multiple addresses as each patient can have many)

const AddressTab = () => {
const { postData } = useContext(PatientContext)
const { adminID } = useContext(LoginContext)
const [ deleted, setDeleted ] = useState(false)
const [ addressData, setAddressData ] = useState({
    AddressID: "",
    PatientID: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    City: "",
    Province: "",
    PostalCode: "",
    Category: ""
})
const [changes, setChanges] = useState([ 'PatientID' ]);
const [edit, setEdit] = useState(true);

useEffect(() => {
    const getData = async () => {
      try {
        console.log(postData)
        const response = await axios.get('api/address', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    );
        console.log(response)
        setAddressData(response.data[0]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setAddressData ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
    setChanges([...changes, name]);
  }


//Submits the form addressData after running 'sendData' to create the final object of changed data.    
  const handleSubmit = async (event) => {
    event.preventDefault()
    let sendData = [] 
    changes.forEach(column => {
        if(addressData[column]){
              sendData = ({...sendData, [column]: addressData[column] })
            }
        })
    console.log(sendData)
    try {
      const response = await axios({
        method: "post",
        url: "api/address/edit",
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
          url: "api/address/delete",
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
            <button onClick={handleDelete} id={addressData.HealthCardNumberID}>
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
            name="HealthCardNumberID"
            placeholder={addressData.PatientID}
            value={addressData.PatientID}
            disabled={true}
          />

          <label htmlFor="AddressLine1">Address Line 1:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="AddressLine1"
            placeholder={addressData.AddressLine1}
            value={addressData.AddressLine1}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="AddressLine2">Address Line 2:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="AddressLine2"
            placeholder={addressData.AddressLine2}
            value={addressData.AddressLine2}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="AddressLine3">Address Line 3:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="AddressLine3"
            placeholder={addressData.AddressLine3}
            value={addressData.AddressLine3}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="City">City:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="City"
            placeholder={addressData.City}
            value={addressData.City}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Province">Province:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="Province"
            placeholder={addressData.Province}
            value={addressData.Province}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="PostalCode">Postal Code:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="PostalCode"
            placeholder={addressData.PostalCode}
            value={addressData.PostalCode}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Category">Category:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="Category"
            placeholder={addressData.Category}
            value={addressData.Category}
            onChange={handleChange}
            readOnly={edit}
          />

          {!edit ? <input type="submit" /> : null}
        </form>
      </>
    );
}

export default AddressTab;