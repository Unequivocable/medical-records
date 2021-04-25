import React, { useContext, useEffect, useState } from 'react';
import { LoginContext, PatientContext } from '../sub-components/Context';
import axios from 'axios';


const AddressTab = () => {
const { postData } = useContext(PatientContext)
const { careID, adminID } = useContext(LoginContext)
const [ addressData, setAddressData ] = useState([{
    AddressID: "",
    PatientID: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    City: "",
    Province: "",
    PostalCode: "",
    Category: ""
}]) 
const [changes, setChanges] = useState([ 'PatientID' ]);
const [edit, setEdit] = useState(true);
const [add, setAdd] = useState(false);
const [refresh, setRefresh] = useState(false);
const [ addressDataAdd, setAddressDataAdd ] = useState({
  PatientID: postData.HealthCardNumberID,
  AddressLine1: "",
  AddressLine2: "",
  AddressLine3: "",
  City: "",
  Province: "",
  PostalCode: "",
  Category: ""
})



useEffect(() => {
    const getData = async () => {
      console.log(refresh)
      try {
        const response = await axios.get('api/address', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    );
        console.log(response)
        if(response.data[0]) {
          setAddressData(response.data);
        } else {
          setAddressData([{
            PatientID: "",
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            City: "",
            Province: "",
            PostalCode: "",
            Category: ""
          }])
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setAddressData, refresh ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    const thisIndex = addressData.map((item) => {
      return item.AddressID;
    }).indexOf(parseInt(event.target.parentElement.id))
    let newData = [...addressData]
    newData[thisIndex][name] = value;
    setAddressData(newData);
    setChanges([...changes, name]);
  }

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;
    setAddressDataAdd({
      ...addressDataAdd,
      [name]: value,
    });
    }

//Submits the form addressData after running 'sendData' to create the final object of changed data.    
  const handleSubmit = async (event) => {
    event.preventDefault()
    const thisIndex = addressData.map((item) => {
        return item.AddressID;
      }).indexOf(parseInt(event.target.id))

    let filteredChanges = changes.filter(function(item, index){
        return changes.indexOf(item) >= index;
    });
    let sendData = addressData[thisIndex]
    const createRD = (PatientID) => {
      if(careID){
      return {
          PatientID: PatientID,
          CareProviderID: careID,
          RevisionDetails: "Updated address fields: " + filteredChanges.filter(field => field !== "PatientID").join(", ")
        }
    } else {
       return {
        PatientID: PatientID,
        SuperAdminID: adminID,
        RevisionDetails: "Updated address fields: " + filteredChanges.filter(field => field !== "PatientID").join(", ")
      }
    }}
    let revisionDetails = createRD(sendData.PatientID);
    try {
      const response = await axios({
        method: "put",
        url: "api/address/edit",
        data: sendData
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
      setChanges([ 'PatientID' ])
      setEdit(!edit)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleSubmitAdd = async (event) => {
    event.preventDefault()
    const createRD = (PatientID) => {
      if(careID){
      return {
          PatientID: PatientID.PatientID,
          CareProviderID: careID,
          RevisionDetails: "Added New " + PatientID.Category + " Address"
        }
    } else {
       return {
        PatientID: PatientID.PatientID,
        SuperAdminID: adminID,
        RevisionDetails: "Added New " + PatientID.Category + " Address"
      }
    }}
    let revisionDetails = createRD(addressDataAdd);
    console.log(addressDataAdd)
    try {
      const response = await axios({
        method: "post",
        url: "api/address/add",
        data: addressDataAdd
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
      setAdd(!add)
      setRefresh(!refresh)
      setAddressDataAdd({
        PatientID: postData.HealthCardNumberID,
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        City: "",
        Province: "",
        PostalCode: "",
        Category: ""
      })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }


  const handleDelete = async (event) => { 
    const deleteData = { AddressID: [event.target.id] }
    const createRD = (PatientID) => {
      if(careID){
      return {
          PatientID: PatientID,
          CareProviderID: careID,
          RevisionDetails: "Deleted Address"
        }
    } else {
       return {
        PatientID: PatientID,
        SuperAdminID: adminID,
        RevisionDetails: "Deleted Address"
      }
    }}
    let revisionDetails = createRD(postData.HealthCardNumberID);

    if (window.confirm("Please select Ok to confirm you want to delete this address.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "delete",
          url: "api/address/delete",
          data: deleteData,
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
        alert("Address has been deleted");
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
            <label htmlFor="AddressLine1">Address Line 1:</label>
            <input
              type="text"
              className="form"
              name="AddressLine1"
              placeholder="Address Line 1"
              value={addressDataAdd.AddressLine1}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="AddressLine2">Address Line 2:</label>
            <input
              type="text"
              className="form"
              name="AddressLine2"
              placeholder="Address Line 2"
              value={addressDataAdd.AddressLine2}
              onChange={handleChangeAdd}
            />

            <label htmlFor="AddressLine3">Address Line 3:</label>
            <input
              type="text"
              className="form"
              name="AddressLine3"
              placeholder="Address Line 3"
              value={addressDataAdd.AddressLine3}
              onChange={handleChangeAdd}
            />

            <label htmlFor="City">City:</label>
            <input
              type="text"
              className="form"
              name="City"
              placeholder="City"
              value={addressDataAdd.City}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="Province">Province:</label>
            <input
              type="text"
              className="form"
              name="Province"
              placeholder="Province"
              value={addressDataAdd.Province}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="PostalCode">Postal Code:</label>
            <input
              type="text"
              className="form"
              name="PostalCode"
              placeholder="Postal Code"
              value={addressDataAdd.PostalCode}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="Category">Category:</label>
            <input
              type="text"
              className="form"
              name="Category"
              placeholder="Home or Work"
              value={addressDataAdd.Category}
              onChange={handleChangeAdd}
              required
            />

            <input type="submit" />
          </form>
        ) : null}

        {addressData.map((addressData) => (
        <div key={addressData.AddressID}>

        {addressData.AddressID ? <>
        <button onClick={handleDelete} id={addressData.AddressID}>Delete</button>
        <button onClick={() => setEdit(!edit)}>Edit</button> </> : null}

        <form className="patient" id={addressData.AddressID} onSubmit={handleSubmit}>

          <label htmlFor="AddressLine1">Address Line 1:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="AddressLine1"
            placeholder={addressData.AddressLine1}
            value={addressData.AddressLine1}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="AddressLine2">Address Line 2:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="AddressLine2"
            placeholder={addressData.AddressLine2 ? addressData.AddressLine2 : ""}
            value={addressData.AddressLine2}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="AddressLine3">Address Line 3:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="AddressLine3"
            placeholder={addressData.AddressLine3 ? addressData.AddressLine3 : ""}
            value={addressData.AddressLine3}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="City">City:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="City"
            placeholder={addressData.City}
            value={addressData.City}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Province">Province:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="Province"
            placeholder={addressData.Province}
            value={addressData.Province}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="PostalCode">Postal Code:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="PostalCode"
            placeholder={addressData.PostalCode}
            value={addressData.PostalCode}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Category">Category:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="Category"
            placeholder={addressData.Category}
            value={addressData.Category}
            onChange={handleChange}
            readOnly={edit}
          />

          {!edit ? <input type="submit" /> : null}
        </form>
        </div>)) }
      
  
      </>
    );
}

export default AddressTab;