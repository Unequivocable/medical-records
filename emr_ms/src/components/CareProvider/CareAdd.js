import React, { useContext, useState } from 'react';
import { CareProviderContext, LoginContext } from '../sub-components/Context'
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom'

const CareAdd = () => {
    const { setPostData } = useContext(CareProviderContext)
    // const { careID, adminID } = useContext(LoginContext)
    const [ newData, setNewData ] = useState({
      MedicalLicenseID:"", 
      firstName: "",
      lastName: "",
      Phone: "",
      Email: "",
      AreaofPractice: "",
      });
      const [ submitted, setSubmitted ] = useState(false)
    
    
    // On all inputs in form (except checkbox) handleChange will add the new value to 'newData' 
      const handleChange = (event) => {
        const { name, value } = event.target;
        setNewData({
          ...newData,
          [name]: value,
        });
      }
    
    
    //Submits all form data and then sends the primary key to postData and redirects to the add/edit page.  Add/edit page will do a new retrival from DB of the newly added entry based on postData ID.
      const handleSubmit = async (event) => {
        event.preventDefault()
        let revisionDetails = ({
          PatientID: null,
          CareProviderID: newData.MedicalLicenseID,
          SuperAdminID: "super@admin.com",
          RevisionDetails: "Added New Care Provider" 
        })
        try {
          const response = await axios({
            method: "post",
            url: "api/careprovider/add",
            data: newData
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
          alert("Data has been added");
          setPostData({ MedicalLicenseID: newData.MedicalLicenseID });
          setSubmitted(true)
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }
    
        return (
            <>
              <NavLink to="/careprovider"><button>Search</button></NavLink>
               {submitted ? <Redirect to="/careread" /> : null}
              <form className="patient" onSubmit={handleSubmit}>
    
          <label htmlFor="MedicalLicenseID">MedicalLicenseID:</label>
        <input type="text" className='form' name="MedicalLicenseID" placeholder="Medical License ID" value={newData.MedicalLicenseID} onChange={handleChange}/>

        <label htmlFor="firstName">First Name:</label>
        <input type="text" className='form' name="firstName" placeholder="First Name" value={newData.firstName} onChange={handleChange}/>

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" className='form' name="lastName" placeholder="Last Name" value={newData.lastName} onChange={handleChange}/>

        <label htmlFor="Phone">Phone:</label>
        <input type="phone" className='form' name="Phone" placeholder="Phone"  value={newData.Phone} onChange={handleChange}/>

        <label htmlFor="Email">Email:</label>
        <input type="email" className='form' name="Email" placeholder="email@email.com" value={newData.Email} onChange={handleChange}/>

        <label htmlFor="AreaofPractice">AreaofPractice:</label>
        <input type="text" className='form' name="AreaofPractice" placeholder="Area of Practice" value={newData.AreaofPractice} onChange={handleChange}/>

        
            <input type="submit" />
          </form>
        </>
    )
}

export default CareAdd;