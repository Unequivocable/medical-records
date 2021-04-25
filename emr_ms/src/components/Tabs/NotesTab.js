import React, { useContext, useEffect, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';


const NotesTab = () => {
const { postData } = useContext(PatientContext)
const { careID } = useContext(LoginContext)
const [ notesData, setNotesData ] = useState([{
    PatientID: "",
    CareProviderID: "",
    NoteID: "",
    NoteDetail: "",
    Timestamp: ""
  }])
const [changes, setChanges] = useState([ 'NoteID' ]);
const [edit, setEdit] = useState(true);
const [add, setAdd] = useState(false);
const [refresh, setRefresh] = useState(false);
const [ notesDataAdd, setNotesDataAdd ] = useState({
  PatientID: postData.HealthCardNumberID,
  CareProviderID: careID,
  NoteDetail: ""
  })

useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('api/notes', { params: postData }
        // headers: { Authorization: `Bearer ${token.token}` },
    )
    //.then(function (res) { 
        console.log(response.data)
        setNotesData(response.data);
      //})
    } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [ postData, setNotesData, refresh ]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    const thisIndex = notesData.map((item) => {
      return item.NoteID;
    }).indexOf(parseInt(event.target.parentElement.id))
    let newData = [...notesData]
    newData[thisIndex][name] = value;
    setNotesData(newData);
    setChanges([...changes, name]);
  }

//Submits the form notesData after running 'sendData' to create the final object of changed data.    
  const handleSubmit = async (event) => {
    event.preventDefault()
    const thisIndex = notesData.map((item) => {
      return item.NoteID;
    }).indexOf(parseInt(event.target.id))
  let sendData = notesData[thisIndex]
  let revisionDetails = {
    PatientID: postData.HealthCardNumberID,
    CareProviderID: careID,
    RevisionDetails: "Updated Note"
  }
    try {
      const response = await axios({
        method: "put",
        url: "api/notes/edit",
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
      setRefresh(!refresh)
      setEdit(!edit)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;
    setNotesDataAdd({
      ...notesDataAdd,
      [name]: value,
    });
    }

    const handleSubmitAdd = async (event) => {
      event.preventDefault()
    
      let revisionDetails = {PatientID: postData.HealthCardNumberID,
                            CareProviderID: careID,
                            RevisionDetails: "Added New Note"};
      try {
        const response = await axios({
          method: "post",
          url: "api/notes/add",
          data: notesDataAdd
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
        setNotesDataAdd({
          PatientID: postData.HealthCardNumberID,
          CareProviderID: careID,
          //NoteID: "",
          NoteDetail: "",
          //Timestamp: ""
        })
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  
  // const handleDelete = async (event) => { 
  //   const deleteData = { NoteID: [event.target.id] }
  //   let revisionDetails = {PatientID: postData.HealthCardNumberID,
  //     CareProviderID: careID,
  //     RevisionDetails: "Deleted Note " + event.target.id};
  //   if (window.confirm("Please select Ok to confirm you want to delete this note.  Select Cancel to cancel the delete request.")) {
  //     try {
  //       const response = await axios({
  //         method: "delete",
  //         url: "api/notes/delete",
  //         data: deleteData,
  //         // headers: { Authorization: `Bearer ${token.token}` },
  //       });

  //       const rdAdd = await axios({
  //         method: "post",
  //         url: "api/revision/add",
  //         data: revisionDetails
  //         // headers: { Authorization: `Bearer ${token.token}` },
  //       });
  //       console.log(rdAdd)
  //       console.log(response);
  //       alert("Note has been deleted");
  //       setRefresh(!refresh)
  //       // console.log(response);
  //       // alert("Address has been deleted");
  //       // setDeleted(true)
  //     } catch (error) {
  //       alert(error);
  //       console.log(error);
  //     }
  //   }
  // }



    return (
      <>
        {careID ? (
          <>
            <button onClick={() => setAdd(!add)}>Add New</button>

            {add ? (
            <form className="patient" onSubmit={handleSubmitAdd}>
              <label htmlFor="notes">Notes:</label>
              <input
                type="textarea"
                className="form"
                name="NoteDetail"
                placeholder=""
                value={notesDataAdd.NoteDetail}
                onChange={handleChangeAdd}
                required
              />

              <input type="submit" />
            </form>
            ) : null }

          </>
        ) :  <p>You must be logged in as a Care Provider to write notes.</p>}

        {notesData.map((entry) => (
        <div className="notes" key={entry.NoteID}>
          {entry.NoteID ? <>
          {/* <button onClick={handleDelete} id={entry.NoteID}> Delete </button> */}
            <button onClick={() => setEdit(!edit)}>Edit</button> </> : null}

        <form className="patient" id={entry.NoteID} onSubmit={handleSubmit}>
          
          <label htmlFor="NoteDetail">Note:</label>
          <input
            type="text"
            className={edit ? "not-form" : "form"}
            name="NoteDetail"
            placeholder={entry.NoteDetail}
            value={entry.NoteDetail}
            onChange={handleChange}
            readOnly={edit}
          />

          <label htmlFor="Timestamp">Timestamp:</label>
          <input
            type="text"
            className="not-form"
            name="Timestamp"
            placeholder={entry.Timestamp}
            value={entry.Timestamp}
            onChange={handleChange}
            readOnly
          /> 
          
          {!edit ? <input type="submit" /> : null}
        </form>
        </div>))}
      </>
    );
}

export default NotesTab;