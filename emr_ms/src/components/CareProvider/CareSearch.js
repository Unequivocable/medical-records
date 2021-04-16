import React, { useContext } from 'react';
import { CareProviderContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";

const PatSearch = () => {
const { data, setData } = useContext(CareProviderContext)
const { careID, adminID } = useContext(LoginContext)

    return (
        <>
             <NavLink to="/cpadd">Add</NavLink>
             <NavLink to="/cpread">Read</NavLink>
        </>
    )
}

export default PatSearch;