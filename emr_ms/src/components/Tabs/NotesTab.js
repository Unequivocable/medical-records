import React, { useContext, useEffect, useState } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';


//Add and Delete haven't been checked
//Need to make this iterable (ie.  Array that uses .map to display multiple notes as each patient can have many)


const NotesTab = () => {
const { postData } = useContext(PatientContext)
const { careID } = useContext(LoginContext)
const [ deleted, setDeleted ] = useState(false)
const [ notesData, setNotesData ] = useState([{
    PatientID: "",
    CareProviderID: "",
    NoteID: "",
    NoteDetail: "",
    Timestamp: ""
  }])
const [changes, setChanges] = useState([ 'PatientID' ]);
const [edit, setEdit] = useState(true);
const [add, setAdd] = useState(false);
const [refresh, setRefresh] = useState(false);
const [ notesDataAdd, setNotesDataAdd ] = useState({
  PatientID: postData.HealthCardNumberID,
  CareProviderID: careID,
  //NoteID: "",
  NoteDetail: "",
  //Timestamp: ""
  })

useEffect(() => {
    const getData = async () => {
      try {
        //console.log(postData)
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
  }, [ postData, setNotesData ]);

// On all inputs in form (except checkbox) handleChange will add the new value to 'data' and record the changed field in 'changes'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNotesData({
      ...notesData,
      [name]: value,
    });
    setChanges([...changes, name]);
  }


//Submits the form notesData after running 'sendData' to create the final object of changed data.    
  const handleSubmit = async (event) => {
    event.preventDefault()
    let sendData = [] 
    changes.forEach(column => {
        if(notesData[column]){
              sendData = ({...sendData, [column]: notesData[column] })
            }
        })
    console.log(sendData)
    try {
      const response = await axios({
        method: "post",
        url: "api/notes/edit",
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
  
  const handleDelete = async (event) => { 
    const deleteData = { NoteID: [event.target.id] }
    let revisionDetails = {PatientID: postData.HealthCardNumberID,
      CareProviderID: careID,
      RevisionDetails: "Deleted Note " + event.target.id};
    if (window.confirm("Please select Ok to confirm you want to delete this note.  Select Cancel to cancel the delete request.")) {
      try {
        const response = await axios({
          method: "post",
          url: "api/notes/delete",
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
        alert("Note has been deleted");
        setRefresh(!refresh)
        // console.log(response);
        // alert("Address has been deleted");
        // setDeleted(true)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }



    return (
      <>
        {/* {deleted ? <Redirect to="/patient" /> : null} */}
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
            ) : null}

          </>
        ) : null}

        {notesData.map((entry) => (
        <div className="notes" key={entry.NoteID}>
          {notesData.NoteID ? <>
          <button onClick={handleDelete} id={notesData.NoteID}> Delete </button>
            <button onClick={() => setEdit(!edit)}>Edit</button> </> : null}

        <form className="patient" onSubmit={handleSubmit}>
          
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
            className={edit ? "not-form" : "form"}
            name="Timestamp"
            placeholder={entry.Timestamp}
            value={entry.Timestamp}
            onChange={handleChange}
            readOnly={edit}
          /> 
          
          {!edit ? <input type="submit" /> : null}
        </form>
        </div>))}
      </>
    );
}

export default NotesTab;