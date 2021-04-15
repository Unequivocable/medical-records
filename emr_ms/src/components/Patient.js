import React, { useState, useEffect } from "react";
import Menu from "./sub-components/Menu";
import Nav from './sub-components/Nav';
import axios from 'axios';

const Patient = (props) => {
  const [edit, setEdit] = useState(false);
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



    const handleChange = (event) => {
      const { name, value } = event.target;
      setData({
        ...data,
        [name]: value,
      });
      console.log(event.target)
      console.log(data)
    }

    const handleChange2 = (event) => {
      const { name } = event.target;
      setData({
        ...data,
        [name]: event.target.checked,
      });
      console.log(event.target.checked)
      console.log(data)
    }
   
    const handleSubmit = async (event) => {
      event.preventDefault()
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
    <>
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
        <input type="checkbox" name="Smoker" className={edit ? 'not-form' : 'form'} onChange={handleChange2} value='1' readOnly={edit}/>
        <input type="submit" />
      </form>

    </div>

    </>
  );
};

export default Patient;
