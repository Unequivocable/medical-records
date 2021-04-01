import React from "react";

const Menu = (props) => {
  return (
    <>
      <ul>
        <li>
        <form>   
          <input type="text" placeholder=" Search...." name="search"/>   
          <button type="submit">Submit</button>   
        </form>  
        </li>
        <li>
        <button type="button">Edit</button> 
        </li>
        {props.superadmin ?  
          <>
          <li>
          <button type="button">Add</button> 
           </li>
           <li>
          <button type="button">Delete</button> 
           </li>
          </>      
        : null}
      </ul>
    </>
  );
};

export default Menu;
