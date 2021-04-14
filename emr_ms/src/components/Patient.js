import React from "react";
import Menu from "./sub-components/Menu";
import Nav from './sub-components/Nav'

const Patient = (props) => {

  let hcn = "Health Card Number"
  let firstName = "First Name"
  let lastName = "Last Name"
  let phone = "0123456789"
  let phone2 = ""
  let email = "address@email.com"
  let lang = "EN"
  let bdate = '1980-05-16'
  let gender = "M"
  let ethBG = "Caucasian"
  let insprov = "Manulife Financial"
  let smoker = true

  return (
    <>
    <header>
      <Nav superadmin={props.location.superadmin} patient="active-page"/>
      <Menu superadmin={props.location.superadmin}/>
    </header>
    <div className="main">
      <form className="patient">

        <label for="healthCardNum">Health Card Number:</label>
        <input type="text" name="healthCardNum" placeholder={hcn} disabled="true"/>

        <label for="firstName">First Name:</label>
        <input type="text" name="firstName" placeholder={firstName} disabled="true"/>

        <label for="lastName">Last Name:</label>
        <input type="text" name="lastName" placeholder={lastName} disabled="true"/>

        <label for="phone">Phone:</label>
        <input type="phone" name="phone" placeholder={phone} disabled="true"/>

        <label for="phone2">Phone2:</label>
        <input type="phone" name="phone2" placeholder={phone2} disabled="true"/>

        <label for="email">Email:</label>
        <input type="email" name="email" placeholder={email} disabled="true"/>

        <label for="lang">Language:</label>
        <input type="text" name="lang" placeholder={lang} disabled="true"/>

        <label for="bdate">Date of Birth:</label>
        <input type="date" name="bdate" value={bdate} disabled="true"/>

        <label for="gender">Gender:</label>
        <select name="gender" defaultValue={gender} disabled="true">
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>

        <label for="ethBG">Ethnical Background:</label>
        <input type="text" name="ethBG" placeholder={ethBG} disabled="true"/>

        <label for="insprov">Insurance Provider:</label>
        <input type="text" name="insprov" placeholder={insprov} disabled="true"/>

        <label for="smoker">Smoker:</label>
        <input type="checkbox" name="smoker" checked disabled="true"/>

      </form>
    </div>
    </>
  );
};

export default Patient;
