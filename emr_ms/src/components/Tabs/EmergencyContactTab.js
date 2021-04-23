import React, { useContext, useEffect, useState } from 'react';
import { PatientContext } from '../sub-components/Context';
import axios from 'axios';

const EmergencyContactTab = () => {
const { postData } = useContext(PatientContext)
const [ ecData, setEcData ] = useState([{
    PatientID: "",
    ContactID: "",
    firstName: "",
    lastName: "",
    Phone: "",
    Email: "",
    Relationship: ""
  }])
const [changes, setChanges] = useState([ 'PatientID' ]);
const [edit, setEdit] = useState(true);
const [add, setAdd] = useState(false);
const [refresh, setRefresh] = useState(false);
const [ ecDataAdd, setEcDataAdd ] = useState({
  PatientID: postData.HealthCardNumberID,
  firstName: "",
  lastName: "",
  Phone: "",
  Email: "",
  Relationship: ""
})

useEffect(() => {
    const getData = async () => {
      try {
        console.log(refresh)
        const response = await axios.get('api/emergency', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    );
        console.log(response)
        if(response.data[0]) {
          setEcData(response.data);
        } else {
          setEcData([{
            PatientID: "",
            firstName: "",
            lastName: "",
            Phone: "",
            Email: "",
            Relationship: ""
          }])
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setEcData, refresh ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEcData({
      ...ecData,
      [name]: value,
    });
    setChanges([...changes, name]);
  }

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;
    setEcDataAdd({
      ...ecDataAdd,
      [name]: value,
    });
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

  const handleSubmitAdd = async (event) => {
    event.preventDefault()
    console.log(ecDataAdd)
    try {
      const response = await axios({
        method: "post",
        url: "api/emergency/add",
        data: ecDataAdd
        // headers: { Authorization: `Bearer ${token.token}` },
      });
      console.log(response);
      alert("Data has been updated");
      setAdd(!add)
      setRefresh(!refresh)
      setEcDataAdd({
        PatientID: postData.HealthCardNumberID,
        firstName: "",
        lastName: "",
        Phone: "",
        Email: "",
        Relationship: ""
      })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }


  const handleDelete = async (event) => { 
    const deleteData = { ContactID: [event.target.id] }
    
    if (window.confirm("Please select Ok to confirm you want to delete this Contact.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "post",
          url: "api/emergency/delete",
          data: deleteData,
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        console.log(response);
        alert("Contact has been deleted");
        setRefresh(!refresh)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }



    return (
      <>
        <button onClick={() => setAdd(!add)}>Add New</button>

        {add ? (
          <form className="patient" onSubmit={handleSubmitAdd}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form"
              name="firstName"
              placeholder="First Name"
              value={ecDataAdd.firstName}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form"
              name="lastName"
              placeholder="Last Name"
              value={ecDataAdd.lastName}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="Phone">Phone:</label>
            <input
              type="phone"
              className="form"
              name="Phone"
              placeholder="123456789"
              value={ecDataAdd.Phone}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              className="form"
              name="Email"
              placeholder="Email@email.com"
              value={ecDataAdd.Email}
              onChange={handleChangeAdd}
            />

            <label htmlFor="Relationship">Relationship:</label>
            <input
              type="text"
              className="form"
              name="Relationship"
              placeholder="Relationship"
              value={ecDataAdd.Relationship}
              onChange={handleChangeAdd}
              required
            />

            <input type="submit" />
          </form>
        ) : null}

        {ecData[0].PatientID ? ecData.map((ecData) => (
        <div key={ecData.ContactID}>

        <button onClick={handleDelete} id={ecData.ContactID}>Delete</button>
        <button onClick={() => setEdit(!edit)}>Edit</button>

        <form className="patient" onSubmit={handleSubmit}>
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
        </div>)) : null} 
      </>
    );
}

export default EmergencyContactTab;