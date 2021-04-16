import React, { useState, useEffect, useContext } from "react";
import Menu from "./sub-components/Menu";
import Nav from './sub-components/Nav';
import axios from 'axios';
import { PatientContext, LoginContext } from './sub-components/Context'

const Patient = (props) => {
  // Imports any of the App level Login variables
  const { token } = useContext(LoginContext);

  //  Sets ability to edit on or off -- this needs to be in the edit page component so may need to be moved
  const [edit, setEdit] = useState(false);

  //  Data is where the GET import of details is stored.  useState default needs to match column names in DB with initial values in it.
  const [data, setData] = useState({
    HealthCardNumberID:"Health Card Number", 
    firstName: "First Name",
    lastName: "Last Name",
    Phone: "0123456789",
    Phone2: "0123456789",
    Email: "address@email.com",
    Language: "EN",
    BirthDate: '1980-05-16',
    Gender: "F",
    EthnicBackground: "Caucasian",
    InsuranceProvider: "Manulife Financial",
    Smoker: true
    });

// Changes is an array that contains only fields that have changed.  Is used to only send changed fields to DB as well as to add into Revision Details.  Default state needs to contian primary ID.
    const [changes, setChanges] = useState([ 'HealthCardNumberID' ]);
  
// postData is the filtered data of any changed fields that will be sent to the DB.
    const [postData, setPostData] = useState({});

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios({
            method: "get",
            url: "api/patient"
            // headers: { Authorization: `Bearer ${token.token}` },
          });
          console.log(response)
          setData(response.data[0]);
        } catch (error) {
          alert(error);
          console.log(error);
        }
      };
      getData();
    }, []);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
    const handleChange = (event) => {
      const { name, value } = event.target;
      setData({
        ...data,
        [name]: value,
      });
      console.log(data)
      setChanges([...changes, name]);
      console.log(changes)
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

// To be run before submitting changes.  This looks at 'data' and changed fields in 'changes' and makes a new object 'postData' that only has changed values in it.
    const sendData = (formData, columns) => {
        columns.forEach(column => {
          if(formData[column]){
            setPostData({...postData, [column]: formData[column] })
          }
      })
    }
 

//Submits the form data after running 'sendData' to create the final object of changed data.    
    const handleSubmit = async (event) => {
      event.preventDefault()
      sendData(data, changes);
      try {
        const response = await axios({
          method: "post",
          url: "api/patient",
          data: data
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        console.log(response);
        alert("Data has been updated");
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }



  return (

    // Any component within the context Provider wrapper will have access to the state variables entered here

    <PatientContext.Provider
      value={{
        data,
        changes
      }}
    >
    <header>
      <Nav superadmin={props.location.superadmin} patient="active-page"/>
      <Menu superadmin={props.location.superadmin}/>
      <button onClick={()=>setEdit(!edit)}>Edit</button>
    </header>
    <div className="main">
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
        <select name="Gender" defaultValue={data.Gender} value={data.Gender} className={edit ? 'not-form' : 'form'} onChange={handleChange} readOnly={edit}>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>

        <label htmlFor="EthnicBackground">Ethnic Background:</label>
        <input type="text" name="EthnicBackground" className={edit ? 'not-form' : 'form'} placeholder={data.EthnicBackground} value={data.EthnicBackground} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="InsuranceProvider">Insurance Provider:</label>
        <input type="text" name="InsuranceProvider" className={edit ? 'not-form' : 'form'} placeholder={data.InsuranceProvider} value={data.InsuranceProvider} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Smoker">Smoker:</label>
        <input type="checkbox" name="Smoker" className={edit ? 'not-form' : 'form'} onChange={handleChangeCheckbox} checked={data.Smoker} readOnly={edit}/>
        <input type="submit" />
      </form>

    </div>

    </PatientContext.Provider>
  );
};

export default Patient;
