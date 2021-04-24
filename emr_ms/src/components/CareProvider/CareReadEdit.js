import React, { useContext, useEffect, useState } from 'react';
import { CareProviderContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CPAddressTab from '../Tabs/CPAddressTab';
import CPRevisionDetailsTab from '../Tabs/CPRevisionDetailsTab';

const CareReadEdit = () => {
const { 
    data, setData, 
    postData, 
    changes, setChanges, 
    edit, setEdit } = useContext(CareProviderContext)
const { adminID } = useContext(LoginContext)
const [ deleted, setDeleted ] = useState(false)
const [ tabIndex, setTabIndex ] = useState(0)

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
    
      let revisionDetails = {
      CareProviderID: postData.MedicalLicenseID,
      SuperAdminID: adminID,
      RevisionDetails: "Updated fields: " + filteredChanges.filter(field => field !== "MedicalLicenseID").join(", ")
    }
  
    try {
      const response = await axios({
        method: "post",
        url: "api/careprovider/edit",
        data: data
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
      setEdit(!edit)
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

        <label htmlFor="AreaofPractice">Area of Practice:</label>
        <input type="text" className={edit ? 'not-form' : 'form'} name="AreaofPractice" placeholder={data.AreaofPractice} value={data.AreaofPractice} onChange={handleChange} readOnly={edit}/>

        
        {!edit ? <input type="submit" /> : null}
      </form>

      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList>
        <Tab>Address</Tab>
        <Tab>Revision Details</Tab>
      </TabList>
      <TabPanel className="address">
        <CPAddressTab />
        </TabPanel>
      <TabPanel className="RevisionDetails">
        <CPRevisionDetailsTab />
        </TabPanel>
      </Tabs>

        </>
    )
}

export default CareReadEdit;