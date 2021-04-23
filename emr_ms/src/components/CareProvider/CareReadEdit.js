import React, { useContext, useEffect, useState } from 'react';
import { CareProviderContext } from '../sub-components/Context';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

const CareReadEdit = () => {
const { 
    data, setData, 
    postData, setPostData, 
    changes, setChanges, 
    edit, setEdit } = useContext(CareProviderContext)
// const { careID, adminID } = useContext(LoginContext)
const [ deleted, setDeleted ] = useState(false)

useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('api/careprovider', { params: postData }
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

// On all inputs in form handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
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
        url: "api/careprovider/edit",
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

  const handleDelete = async (event) => { 
    const deleteData = { MedicalLicenseID: [event.target.id] }
    
    if (window.confirm("Please select Ok to confirm you want to delete this careprovider.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "post",
          url: "api/careprovider/delete",
          data: deleteData,
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        console.log(response);
        alert("Care Provider has been deleted");
        setDeleted(true)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }


    return (
        <>
        {deleted ? <Redirect to="/careprovider" /> : null}
         <NavLink to="/careadd"><button>Add</button></NavLink>
         <button onClick={()=>setEdit(!edit)}>Edit</button>
         <button onClick={handleDelete} id={data.MedicalLicenseID}>Delete</button>
         <NavLink to="/careprovider"><button>Search</button></NavLink>
      <form className="patient" onSubmit={handleSubmit}>

        <label htmlFor="MedicalLicenseID">MedicalLicenseID:</label>
        <input type="text" className='not-form' name="MedicalLicenseID" placeholder={data.MedicalLicenseID} value={data.MedicalLicenseID} disabled={true}/>

        <label htmlFor="firstName">First Name:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="firstName" placeholder={data.firstName} value={data.firstName} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="lastName" placeholder={data.lastName} value={data.lastName} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Phone">Phone:</label>
        <input type="phone" className={edit ? 'not-form' : 'form'} name="Phone" placeholder={data.Phone}  value={data.Phone} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="Email">Email:</label>
        <input type="phone" className={edit ? 'not-form' : 'form'} name="Email" placeholder={data.Email}
        value={data.Email} onChange={handleChange} readOnly={edit}/>

        <label htmlFor="AreaofPractice">AreaofPractice:</label>
        <input type="email" className={edit ? 'not-form' : 'form'} name="AreaofPractice" placeholder={data.AreaofPractice} value={data.AreaofPractice} onChange={handleChange} readOnly={edit}/>

        
        {!edit ? <input type="submit" /> : null}
      </form>

        </>
    )
}

export default CareReadEdit;