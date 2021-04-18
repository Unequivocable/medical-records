import React, { useContext } from 'react';
import { CareProviderContext, LoginContext } from '../sub-components/Context'
import { NavLink } from "react-router-dom";

const CareSearch = () => {
const { data, setData } = useContext(CareProviderContext)
const { careID, adminID } = useContext(LoginContext)

    return (
        <>
             <NavLink to="/careadd">Add</NavLink>
             <NavLink to="/careread">Read</NavLink>
        </>
    )
}

export default CareSearch;