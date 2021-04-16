import React, { useContext } from 'react';
import { PatientContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";

const PatSearch = () => {
const { data, setData } = useContext(PatientContext)
const { careID, adminID } = useContext(LoginContext)

    return (
        <>
             <NavLink to="/add">Add</NavLink>
             <NavLink to="/read">Read</NavLink>
        </>
    )
}

export default PatSearch;