import React, { useContext, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context'
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom'

const PatAdd = () => {
    // const { data, setData } = useContext(PatientContext)
    const { setPostData } = useContext(PatientContext)
    const { careID, adminID } = useContext(LoginContext)
    const [ newData, setNewData ] = useState({
      HealthCardNumberID:"", 
      firstName: "",
      lastName: "",
      Phone: "",
      Phone2: "",
      Email: "",
      Language: "",
      BirthDate: "",
      Gender: "",
      EthnicBackground: "",
      InsuranceProvider: "",
      Smoker: false
      });
    const [ submitted, setSubmitted ] = useState(false)

    // On all inputs in form (except checkbox) handleChange will add the new value to 'data' 
      const handleChange = (event) => {
        const { name, value } = event.target;
        setNewData({
          ...newData,
          [name]: value,
        });
        console.log(newData)
      }
    
    // Handles the checkbox changes adding to 'data' 
      const handleChangeCheckbox = (event) => {
        const { name } = event.target;
        setNewData({
          ...newData,
          [name]: event.target.checked,
        });
      }
    
    
    //Submits all form data and then sends the primary key to postData and redirects to the add/edit page.  Add/edit page will do a new retrival from DB of the newly added entry based on postData ID.
      const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const response = await axios({
            method: "post",
            url: "api/patient/add",
            data: newData
            // headers: { Authorization: `Bearer ${token.token}` },
          });
            console.log(response);
            alert("Data has been added");
            setPostData({ HealthCardNumberID: newData.HealthCardNumberID });
            setSubmitted(true)
          } catch (error) {
          alert(error);
          console.log(error);
        }
      }
    
        return (
            <>
          <NavLink to="/patient"><button>Search</button></NavLink>
          <form className="patient" onSubmit={handleSubmit}>
          {submitted ? <Redirect to="/read" /> : null}
    
            <label htmlFor="healthCardNum">Health Card Number:</label>
            <input type="text" className='form' name="HealthCardNumberID" placeholder="Health Card Number" value={newData.HealthCardNumberID} onChange={handleChange}/>
    
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className='form' name="firstName" placeholder="First Name" value={newData.firstName} onChange={handleChange}/>
    
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className='form' name="lastName" placeholder="Last Name" value={newData.lastName} onChange={handleChange} />
    
            <label htmlFor="Phone">Phone:</label>
            <input type="phone" className='form' name="Phone" placeholder="123456789"  value={newData.Phone} onChange={handleChange}/>
    
            <label htmlFor="Phone2">Phone2:</label>
            <input type="phone" className='form' name="Phone2" placeholder="123456789"
            value={newData.Phone2} onChange={handleChange} />
    
            <label htmlFor="Email">Email:</label>
            <input type="email" className='form' name="Email" placeholder="email@email.com" value={newData.Email} onChange={handleChange}/>
    
            <label htmlFor="Language">Language:</label>
            <input type="text" className='form' name="Language" placeholder="EN" value={newData.Language} onChange={handleChange} />
    
            <label htmlFor="BirthDate">Date of Birth:</label>
            <input type="date" className='form' name="BirthDate" value={newData.BirthDate} onChange={handleChange} />
    
            <label htmlFor="Gender">Gender:</label>
            <select name="Gender" value={newData.Gender} className='form' onChange={handleChange} >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
    
            <label htmlFor="EthnicBackground">Ethnic Background:</label>
            <input type="text" name="EthnicBackground" className='form' placeholder="Ethnic Background" value={newData.EthnicBackground} onChange={handleChange} />
    
            <label htmlFor="InsuranceProvider">Insurance Provider:</label>
            <input type="text" name="InsuranceProvider" className='form' placeholder="Insurance Provider" value={newData.InsuranceProvider} onChange={handleChange} />
    
            <label htmlFor="Smoker">Smoker:</label>
            <input type="checkbox" name="Smoker" className='form' onChange={handleChangeCheckbox} checked={newData.Smoker} />
            <input type="submit" />
          </form>
        </>
    )
}

export default PatAdd;