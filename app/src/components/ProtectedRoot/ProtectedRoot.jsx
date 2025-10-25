import React, { useContext } from 'react'
import Login from '../Login/Login';
import { Navigate } from 'react-router-dom';
import { authContext } from '../Context/authenticationContext';

export default function ProtectedRoot({ children ,role }) {
         

  if (localStorage.getItem("tokenJwt") === null) {

    return <Navigate to="/login" />;
  }

  if (role !=undefined && localStorage.getItem("userRole")!= role) {
   
    return <Navigate to="/*" />;
  }


  return <>

    {children}

  </>
}
