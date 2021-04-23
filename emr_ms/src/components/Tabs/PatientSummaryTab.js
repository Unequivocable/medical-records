import React, { useContext, useEffect, useState } from 'react';
import { PatientContext } from '../sub-components/Context';
import axios from 'axios';


//Add and Delete haven't been checked
//Need to make this iterable (ie.  Array that uses .map to display multiple notes as each patient can have many)
//Need to divide this tab into multiple based on category -- or do a big sort in how we're displaying the data.

const PatientSummaryTab = () => {
const { postData } = useContext(PatientContext)
const [ summaryData, setSummaryData ] = useState([{
    PatientID: "",
    HealthSummaryID: "",
    Category: "",
    Detail: "",
    DetailDate: ""
}])
const [changes, setChanges] = useState([ 'PatientID' ]);
const [edit, setEdit] = useState(true);
const [add, setAdd] = useState(false);
const [refresh, setRefresh] = useState(false);
const [ summaryDataAdd, setSummaryDataAdd ] = useState({
  PatientID: postData.HealthCardNumberID,
  Category: "",
  Detail: "",
  DetailDate: ""
})

useEffect(() => {
    const getData = async () => {
      console.log(refresh)
      try {
        const response = await axios.get('api/summary', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    );
        console.log(response.data)
        if(response.data[0]) {
          setSummaryData(response.data);
        }else {
          setSummaryData([{
            PatientID: "",
            HealthSummaryID: "",
            Category: "",
            Detail: "",
            DetailDate: ""
          }])
        }
        } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setSummaryData, refresh ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSummaryData({
      ...summaryData,
      [name]: value,
    });
    setChanges([...changes, name]);
  }

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;
    setSummaryDataAdd({
      ...summaryDataAdd,
      [name]: value,
    });
    }

//Submits the form summaryData after running 'sendData' to create the final object of changed data.    
  const handleSubmit = async (event) => {
    event.preventDefault()
    let sendData = [] 
    changes.forEach(column => {
        if(summaryData[column]){
              sendData = ({...sendData, [column]: summaryData[column] })
            }
        })
    console.log(sendData)
    try {
      const response = await axios({
        method: "post",
        url: "api/summary/edit",
        data: sendData
        // headers: { Authorization: `Bearer ${token.token}` },
      });
      console.log(response);
      alert("Data has been updated");
      setChanges([ 'PatientID' ])
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleSubmitAdd = async (event) => {
    event.preventDefault()
    console.log(summaryDataAdd)
    try {
      const response = await axios({
        method: "post",
        url: "api/summary/add",
        data: summaryDataAdd
        // headers: { Authorization: `Bearer ${token.token}` },
      });
      console.log(response);
      alert("Data has been updated");
      setAdd(!add)
      setRefresh(!refresh)
      setSummaryDataAdd({
        PatientID: postData.HealthCardNumberID,
        Category: "",
        Detail: "",
        DetailDate: ""
      })
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleDelete = async (event) => { 
    const deleteData = { HealthSummaryID: [event.target.id] }
    
    if (window.confirm("Please select Ok to confirm you want to delete this entry.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "post",
          url: "api/summary/delete",
          data: deleteData,
          // headers: { Authorization: `Bearer ${token.token}` },
        });
        console.log(response);
        alert("Entry has been deleted");
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
            <label htmlFor="Category">Category:</label>
            <input
              type="text"
              className="form"
              name="Category"
              placeholder="Category"
              value={summaryDataAdd.Category}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="Detail">Detail:</label>
            <input
              type="textarea"
              className="form"
              name="Detail"
              placeholder="Detail"
              value={summaryDataAdd.Detail}
              onChange={handleChangeAdd}
              required
            />

            <label htmlFor="DetailDate">Detail Date:</label>
            <input
              type="date"
              className="form"
              name="DetailDate"
              value={summaryDataAdd.DetailDate}
              onChange={handleChangeAdd}
              required
            />
            <input type="submit" />
          </form>
        ) : null}


{summaryData[0].PatientID ? summaryData.map((summaryData) => (
        <div key={summaryData.HealthSummaryID}>

        <button onClick={handleDelete} id={summaryData.HealthSummaryID}>Delete</button>
        <button onClick={() => setEdit(!edit)}>Edit</button>

        <form className="patient" onSubmit={handleSubmit}>
          <label htmlFor="Category">Category:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="Category"
            placeholder={summaryData.Category}
            value={summaryData.Category}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Detail">Detail:</label>
          <input
            type="textarea"
            className={edit ? "not-form" : "form"}
            name="Detail"
            placeholder={summaryData.Detail}
            value={summaryData.Detail}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="DetailDate">Detail Date:</label>
          <input
            type="date"
            className={edit ? "not-form" : "form"}
            name="DetailDate"
            placeholder={summaryData.DetailDate}
            value={summaryData.DetailDate}
            onChange={handleChange}
            readOnly={edit}
          />

          {!edit ? <input type="submit" /> : null}
        </form>
        </div>)) : null} 
        </>
    );
}

export default PatientSummaryTab;