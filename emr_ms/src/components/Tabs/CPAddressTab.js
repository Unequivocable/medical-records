import React, { useContext, useEffect, useState } from 'react';
import { CareProviderContext } from '../sub-components/Context';
import axios from 'axios';


const CPAddressTab = () => {
const { postData } = useContext(CareProviderContext)
const [ addressData, setAddressData ] = useState([{
    AddressID: "",
    CareProviderID: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    City: "",
    Province: "",
    PostalCode: "",
    Category: ""
}])
const [changes, setChanges] = useState([ 'CareProviderID' ]);
const [edit, setEdit] = useState(true);
const [add, setAdd] = useState(false);
const [refresh, setRefresh] = useState(false);
const [ addressDataAdd, setAddressDataAdd ] = useState({
  CareProviderID: postData.CareProviderID,
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
        console.log(response.data[0])
        if(response.data[0]) {
          setAddressData(response.data);
        } else {
          setAddressData([{
            CareProviderID: "",
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
    setAddressData({
      ...addressData,
      [name]: value,
    });
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
    let sendData = [] 
    changes.forEach(column => {
        if(addressData[column]){
              sendData = ({...sendData, [column]: addressData[column] })
            }
        })
    console.log(sendData)
    try {
      const response = await axios({
        method: "post",
        url: "api/address/edit",
        data: sendData
        // headers: { Authorization: `Bearer ${token.token}` },
      });
      console.log(response);
      alert("Data has been updated");
      setChanges([ 'CareProviderID' ])
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleSubmitAdd = async (event) => {
    event.preventDefault()
    console.log(addressDataAdd)
    try {
      const response = await axios({
        method: "post",
        url: "api/address/add",
        data: addressDataAdd
        // headers: { Authorization: `Bearer ${token.token}` },
      });
      console.log(response);
      alert("Data has been updated");
      setAdd(!add)
      setRefresh(!refresh)
      setAddressDataAdd({
        CareProviderID: postData.CareProviderID,
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
    
    if (window.confirm("Please select Ok to confirm you want to delete this address.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "post",
          url: "api/address/delete",
          data: deleteData,
          // headers: { Authorization: `Bearer ${token.token}` },
        });
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

        {addressData[0].CareProviderID ? addressData.map((addressData) => (
        <div key={addressData.AddressID}>
        <button onClick={handleDelete} id={addressData.AddressID}>Delete</button>
        <button onClick={() => setEdit(!edit)}>Edit</button>

        <form className="patient" onSubmit={handleSubmit}>
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
        </div>)) : null} 
        
  
      </>
    );
}

export default CPAddressTab;