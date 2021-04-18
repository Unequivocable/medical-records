import React, { useContext } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context'
import axios from 'axios';

const PatAdd = () => {
    const { data, setData } = useContext(PatientContext)
    const { careID, adminID } = useContext(LoginContext)
    
    
    // On all inputs in form (except checkbox) handleChange will add the new value to 'data' 
      const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
          ...data,
          [name]: value,
        });
      }
    
    // Handles the checkbox changes adding to 'data' 
      const handleChangeCheckbox = (event) => {
        const { name } = event.target;
        setData({
          ...data,
          [name]: event.target.checked,
        });
      }
    
    
    //Submits all form data 
      const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const response = await axios({
            method: "post",
            url: "api/patient/add",
            data: data
            // headers: { Authorization: `Bearer ${token.token}` },
          });
          console.log(response);
          alert("Data has been added");
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }
    
        return (
            <>
          <form className="patient" onSubmit={handleSubmit}>
    
            <label htmlFor="healthCardNum">Health Card Number:</label>
            <input type="text" className='form' name="HealthCardNumberID" placeholder={data.HealthCardNumberID} value={data.HealthCardNumberID} onChange={handleChange}/>
    
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className='form' name="firstName" placeholder={data.firstName} value={data.firstName} onChange={handleChange}/>
    
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className='form' name="lastName" placeholder={data.lastName} value={data.lastName} onChange={handleChange} />
    
            <label htmlFor="Phone">Phone:</label>
            <input type="phone" className='form' name="Phone" placeholder={data.Phone}  value={data.Phone} onChange={handleChange}/>
    
            <label htmlFor="Phone2">Phone2:</label>
            <input type="phone" className='form' name="Phone2" placeholder={data.Phone2}
            value={data.Phone2 ? data.Phone2 : "123456789"} onChange={handleChange} />
    
            <label htmlFor="Email">Email:</label>
            <input type="email" className='form' name="Email" placeholder={data.Email} value={data.Email} onChange={handleChange}/>
    
            <label htmlFor="Language">Language:</label>
            <input type="text" className='form' name="Language" placeholder={data.Language} value={data.Language} onChange={handleChange} />
    
            <label htmlFor="BirthDate">Date of Birth:</label>
            <input type="date" className='form' name="BirthDate" placeholder={data.BirthDate} value={data.BirthDate} onChange={handleChange} />
    
            <label htmlFor="Gender">Gender:</label>
            <select name="Gender" defaultValue={data.Gender} value={data.Gender} className='form' onChange={handleChange} >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
    
            <label htmlFor="EthnicBackground">Ethnic Background:</label>
            <input type="text" name="EthnicBackground" className='form' placeholder={data.EthnicBackground} value={data.EthnicBackground} onChange={handleChange} />
    
            <label htmlFor="InsuranceProvider">Insurance Provider:</label>
            <input type="text" name="InsuranceProvider" className='form' placeholder={data.InsuranceProvider} value={data.InsuranceProvider} onChange={handleChange} />
    
            <label htmlFor="Smoker">Smoker:</label>
            <input type="checkbox" name="Smoker" className='form' onChange={handleChangeCheckbox} checked={data.Smoker} />
            <input type="submit" />
          </form>
        </>
    )
}

export default PatAdd;