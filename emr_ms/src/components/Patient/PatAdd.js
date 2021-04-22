import React, { useContext, useState, useEffect } from 'react';
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
    const [ results, setResults ] = useState([{
      MedicalLicenseID: "",
      firstName: "",
      lastName: ""
    }])
    const [ cpArray, setCpArray ] = useState([])


useEffect (() => {
  const searchAll = async () => {
    try {
      const response = await axios.get('api/cp/all'
          // headers: { Authorization: `Bearer ${token.token}` },
      );
      console.log(response);
      setResults(response.data)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
searchAll()
}, [ ]);

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
    
    
    //Submits all form data and then sends the primary key to postData and redirects to the add/edit page.  Add/edit page will do a new retrival from DB of the newly added entry based on postData ID.  The newCP array sends the selected Care Providers to the XREF table in it's own request.
      const handleSubmit = async (event) => {
        event.preventDefault()  
        let revisionDetails = ({
          PatientID: newData.HealthCardNumberID,
          CareProviderID: null,
          SuperAdminID: "super@admin.com",
          RevisionDetails: "Added New Patient" 
        })
        let newCP = [] 
        cpArray.forEach(cp => newCP = ([ ...newCP, [cp, newData.HealthCardNumberID, 1]]));
        try {
          setPostData({ HealthCardNumberID: newData.HealthCardNumberID });
          const patientAdd = await axios({
            method: "post",
            url: "api/patient/add",
            data: newData
            // headers: { Authorization: `Bearer ${token.token}` },
          });
          const p2cAdd = await axios({
            method: "post",
            url: "api/p2c/patient/add",
            data: newCP
            // headers: { Authorization: `Bearer ${token.token}` },
          });
          const rdAdd = await axios({
            method: "post",
            url: "api/revision/add",
            data: revisionDetails
            // headers: { Authorization: `Bearer ${token.token}` },
          });
            console.log(patientAdd);
            console.log(p2cAdd);
            console.log(rdAdd);
            alert("Data has been added");
            setSubmitted(true)
          } catch (error) {
          alert(error);
          console.log(error);
        }
      }

      const handleSelect = (event) => {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setCpArray(value)
       }
      
    
        return (
            <>
          <NavLink to="/patient"><button>Search</button></NavLink>
          <form className="patient" onSubmit={handleSubmit}>
          {submitted ? <Redirect to="/read" /> : null}
    
            <label htmlFor="healthCardNum">Health Card Number:</label>
            <input type="text" className='form' name="HealthCardNumberID" required placeholder="Health Card Number" value={newData.HealthCardNumberID} onChange={handleChange}/>
    
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className='form' name="firstName" required placeholder="First Name" value={newData.firstName} onChange={handleChange}/>
    
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className='form' name="lastName" required placeholder="Last Name" value={newData.lastName} onChange={handleChange} />
    
            <label htmlFor="Phone">Phone:</label>
            <input type="phone" className='form' name="Phone" placeholder="123456789"  value={newData.Phone} onChange={handleChange}/>
    
            <label htmlFor="Phone2">Phone2:</label>
            <input type="phone" className='form' name="Phone2" placeholder="123456789"
            value={newData.Phone2} onChange={handleChange} />
    
            <label htmlFor="Email">Email:</label>
            <input type="email" className='form' name="Email" placeholder="email@email.com" value={newData.Email} onChange={handleChange}/>
    
            <label htmlFor="Language">Language:</label>
            <input type="text" className='form' name="Language" required placeholder="EN" value={newData.Language} onChange={handleChange} />
    
            <label htmlFor="BirthDate">Date of Birth:</label>
            <input type="date" required className='form' name="BirthDate" value={newData.BirthDate} onChange={handleChange} />
    
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

            <select name="CareProviderID" multiple required className='form' id={newData.HealthCardNumberID} onChange={handleSelect}>
                {results.map((entry, i) => (
                   <option key={i} value={entry.MedicalLicenseID}>{entry.MedicalLicenseID}--{entry.lastName},{entry.firstName} </option>
                ))}
            </select>

            <input type="submit" />
          </form>

        </>
    )
}

export default PatAdd;