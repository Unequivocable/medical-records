import React, { useContext, useEffect, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

const PatientSummaryTab = () => {
const { postData } = useContext(PatientContext)
const { adminID } = useContext(LoginContext)
const [ deleted, setDeleted ] = useState(false)
const [ addressData, setAddressData ] = useState({
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
        <input type="text" className='not-form' name="HealthCardNumberID" placeholder={data.HealthCardNumberID} value={data.HealthCardNumberID} disabled={true}/>

        <label htmlFor="Category">Category:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="Category" placeholder={data.Category} value={data.Category} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Detail">Detail:</label>
        <input type="textarea" className={edit ? 'not-form' : 'form'} name="Detail" placeholder={data.Detail} value={data.Detail} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="DetailDate">Detail Date:</label>
        <input type="date" className={edit ? 'not-form' : 'form'} name="DetailDate" placeholder={data.DetailDate} value={data.DetailDate} onChange={handleChange} readOnly={edit}/>



          {!edit ? <input type="submit" /> : null}
        </form>
      </>
    );
}

export default PatientSummaryTab;